import { useState, useRef, useEffect, useMemo } from "react";
import { tempUnitLabel, convertTemp, type UnitSettings } from "../utils/units";
import sunny from "../assets/images/icon-sunny.webp";
import partlyCloudy from "../assets/images/icon-partly-cloudy.webp";
import overcast from "../assets/images/icon-overcast.webp";
import drizzle from "../assets/images/icon-drizzle.webp";
import rain from "../assets/images/icon-rain.webp";
import snow from "../assets/images/icon-snow.webp";
import fog from "../assets/images/icon-fog.webp";
import storm from "../assets/images/icon-storm.webp";

type HourlyForecastProps = {
  data: any;
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

const iconFromCode = (code: number) => {
  if (code === 0) return sunny;
  if ([1, 2].includes(code)) return partlyCloudy;
  if (code === 3) return overcast;
  if ([45, 48].includes(code)) return fog;
  if ([51, 53, 55].includes(code)) return drizzle;
  if ([61, 63, 65, 80, 81, 82].includes(code)) return rain;
  if ([71, 73, 75, 85, 86].includes(code)) return snow;
  if ([95, 96, 99].includes(code)) return storm;

  return sunny;
};

const getDayKey = (date: Date) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");

  return `${year}-${month}-${day}`;
};

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

const buildFallbackDayOptions = () => {
  const today = new Date();

  return Array.from({ length: FORECAST_DAYS_COUNT }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() + index);

    return {
      key: getDayKey(date),
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
  const [selectedDayKey, setSelectedDayKey] = useState<string>(
    fallbackCurrentDayKey
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
      fallbackDayOptions.map((day) => [day.key, buildFallbackHoursForDay(day.key)])
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
      const date = new Date(isoString);
      const dayKey = getDayKey(date);

      if (!grouped[dayKey]) {
        grouped[dayKey] = [];
        labelMap.set(dayKey, getDayLabel(date));
      }

      const rawC = typeof tempsC[index] === "number" ? tempsC[index] : null;
      const converted =
        rawC !== null ? Math.round(convertTemp(rawC, units.temperature)) : null;

      const weatherCode =
        Array.isArray(weatherCodes) && typeof weatherCodes[index] === "number"
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
    if (!dayOptions.some((day) => day.key === selectedDayKey)) {
      setSelectedDayKey(dayOptions[0]?.key ?? "");
    }
  }, [dayOptions, selectedDayKey]);

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
    setSelectedDayKey(dayKey);
    setIsOpen(false);
  };

  const selectedDayLabel =
    dayOptions.find((day) => day.key === selectedDayKey)?.label ?? "";

  const hours =
    hoursByDay[selectedDayKey] ?? buildFallbackHoursForDay(selectedDayKey);

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
              ▾
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
                  className="hourly-forecast__day-option"
                  role="option"
                  aria-selected={selectedDayKey === day.key}
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
        {hours.map((hour, index) => (
          <li key={index} className="hourly-forecast__item">
            <div className="hourly-forecast__time">{hour.label}</div>

            <div className="hourly-forecast__icon" aria-hidden="true">
              {hour.weatherCode !== null ? (
                <img
                  src={iconFromCode(hour.weatherCode)}
                  alt=""
                  aria-hidden="true"
                />
              ) : (
                "–"
              )}
            </div>

            <div className="hourly-forecast__temp">
              {hour.temp !== null
                ? `${hour.temp}${unitLabel}`
                : `–${unitLabel}`}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default HourlyForecast;