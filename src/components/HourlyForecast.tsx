import { useState, useRef, useEffect, useMemo } from "react";
import DropDownIcon from "../assets/images/icon-dropdown.svg";
import type { WeatherForecastResponse } from "../types/weather";
import { formatDateKey, parseWeatherDate } from "../utils/weatherData";
import { weatherCodeToIcon } from "../utils/weatherIcons";
import { tempUnitLabel, convertTemp, type UnitSettings } from "../utils/units";

type HourlyForecastProps = {
  data: WeatherForecastResponse | undefined;
  units: UnitSettings;
};

type HourEntry = {
  label: string;
  temp: number | null;
  weatherCode: number | null;
};

type DayOption = {
  key: string;
  label: string;
};

const FORECAST_DAYS_COUNT = 7;

const getDayLabel = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
  }).format(date);
};

const createDateAtHour = (baseDate: Date, hour: number) => {
  const date = new Date(baseDate);
  date.setHours(hour, 0, 0, 0);
  return date;
};

const buildFallbackDayOptions = (): DayOption[] => {
  const today = new Date();

  return Array.from({ length: FORECAST_DAYS_COUNT }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() + index);

    return {
      key: formatDateKey(date),
      label: getDayLabel(date),
    };
  });
};

const buildFallbackHoursForDay = (dayKey: string): HourEntry[] => {
  const [year, month, day] = dayKey.split("-").map(Number);
  const baseDate = new Date(year, month - 1, day);

  const formatter = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    hour12: true,
  });

  return Array.from({ length: 24 }, (_, hour) => ({
    label: formatter.format(createDateAtHour(baseDate, hour)),
    temp: null,
    weatherCode: null,
  }));
};

const HourlyForecast = ({ data, units }: HourlyForecastProps) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const fallbackDayOptions = useMemo(() => buildFallbackDayOptions(), []);
  const fallbackCurrentDayKey = fallbackDayOptions[0]?.key ?? "";
  const [preferredDayKey, setPreferredDayKey] = useState<string>(
    fallbackCurrentDayKey,
  );

  const unitLabel = tempUnitLabel(units.temperature);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const { dayOptions, hoursByDay } = useMemo(() => {
    const times: string[] | undefined = data?.hourly?.time;
    const tempsC: number[] | undefined = data?.hourly?.temperature_2m;
    const weatherCodes: number[] | undefined = data?.hourly?.weather_code;
    const formatter = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      hour12: true,
    });

    const fallbackHoursByDay = Object.fromEntries(
      fallbackDayOptions.map((day) => [
        day.key,
        buildFallbackHoursForDay(day.key),
      ]),
    ) as Record<string, HourEntry[]>;

    if (!Array.isArray(times) || !Array.isArray(tempsC)) {
      return {
        dayOptions: fallbackDayOptions,
        hoursByDay: fallbackHoursByDay,
      };
    }

    const grouped: Record<string, HourEntry[]> = {};
    const labelMap = new Map<string, string>();

    times.forEach((isoString, index) => {
      const date = parseWeatherDate(isoString);
      const dayKey = formatDateKey(date);

      if (!grouped[dayKey]) {
        grouped[dayKey] = [];
        labelMap.set(dayKey, getDayLabel(date));
      }

      const rawC = typeof tempsC[index] === "number" ? tempsC[index] : null;
      const converted =
        rawC !== null ? Math.round(convertTemp(rawC, units.temperature)) : null;

      const weatherCode =
        typeof weatherCodes?.[index] === "number"
          ? weatherCodes[index]
          : null;

      grouped[dayKey].push({
        label: formatter.format(date),
        temp: converted,
        weatherCode,
      });
    });

    const dataDayOptions = Object.keys(grouped).map((key) => ({
      key,
      label: labelMap.get(key) ?? key,
    }));

    if (dataDayOptions.length === 0) {
      return {
        dayOptions: fallbackDayOptions,
        hoursByDay: fallbackHoursByDay,
      };
    }

    return {
      dayOptions: dataDayOptions,
      hoursByDay: grouped,
    };
  }, [data, units.temperature, fallbackDayOptions]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectDay = (dayKey: string) => {
    setPreferredDayKey(dayKey);
    setIsOpen(false);
  };

  const resolvedSelectedDayKey =
    dayOptions.some((day) => day.key === preferredDayKey)
      ? preferredDayKey
      : dayOptions[0]?.key || fallbackCurrentDayKey;
  const selectedDayLabel =
    dayOptions.find((day) => day.key === resolvedSelectedDayKey)?.label ??
    fallbackDayOptions[0]?.label ??
    "";

  const hours =
    hoursByDay[resolvedSelectedDayKey] ??
    buildFallbackHoursForDay(resolvedSelectedDayKey);

  return (
    <section className="hourly-forecast">
      <header className="hourly-forecast__header">
        <h2 className="section-title">Hourly forecast</h2>

        <div className="hourly-forecast__day-selector" ref={dropdownRef}>
          <button
            type="button"
            className="hourly-forecast__day-button"
            onClick={toggleDropdown}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
          >
            <span>{selectedDayLabel}</span>
            <span className="hourly-forecast__chevron" aria-hidden="true">
              <img src={DropDownIcon} alt="" />
            </span>
          </button>

          {isOpen && (
            <ul
              className="hourly-forecast__day-dropdown"
              role="listbox"
              aria-label="Select day"
            >
              {dayOptions.map((day) => (
                <li
                  key={day.key}
                  className={`hourly-forecast__day-option ${
                    resolvedSelectedDayKey === day.key
                      ? "hourly-forecast__day-option--selected"
                      : ""
                  }`}
                  role="option"
                  aria-selected={resolvedSelectedDayKey === day.key}
                  onClick={() => handleSelectDay(day.key)}
                >
                  {day.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>

      <ul className="hourly-forecast__list">
        {hours.map((hour) => (
          <li
            key={`${resolvedSelectedDayKey}-${hour.label}`}
            className="hourly-forecast__item"
          >
            <div className="hourly-forecast__left">
              <div className="hourly-forecast__icon" aria-hidden="true">
                <img src={weatherCodeToIcon(hour.weatherCode)} alt="" />
              </div>
              <div className="hourly-forecast__time">{hour.label}</div>
            </div>
            <div className="hourly-forecast__right">
              <div className="hourly-forecast__temp">
                {hour.temp !== null ? `${hour.temp}${unitLabel}` : "--"}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default HourlyForecast;