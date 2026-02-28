import { useState, useRef, useEffect, useMemo } from "react";
import type { Units } from "../hooks/useWeatherQuery";
import { tempUnitLabel, convertTemp } from "../utils/units";

const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

type HourlyForecastProps = {
  data: any;
  units: Units;
};

const HourlyForecast = ({ data, units }: HourlyForecastProps) => {
  const [selectedDay, setSelectedDay] = useState<string>("Today");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const unitLabel = tempUnitLabel(units);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelectDay = (day: string) => {
    setSelectedDay(day);
    setIsOpen(false);
    // NOTE: we still show the first 24 hours; you can later
    // slice by day using data.hourly.time if you want.
  };

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

  // Build 24-hour list (00:00–23:00) and plug in temps if we have them
  const hours = useMemo(() => {
    const formatter = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      hour12: true,
    });

    const tempsC: number[] | undefined = data?.hourly?.temperature_2m;

    return Array.from({ length: 24 }, (_, hour) => {
      // label like "12 AM", "1 AM", ..., "11 PM"
      const label = formatter.format(new Date(1970, 0, 1, hour, 0, 0));

      const rawC =
        Array.isArray(tempsC) && typeof tempsC[hour] === "number"
          ? tempsC[hour]
          : null;

      const converted =
        rawC !== null ? Math.round(convertTemp(rawC, units)) : null;

      return {
        label,
        temp: converted,
      };
    });
  }, [data, units]);

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
            <span>{selectedDay}</span>
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
              <li
                className="hourly-forecast__day-option"
                role="option"
                aria-selected={selectedDay === "Today"}
                onClick={() => handleSelectDay("Today")}
              >
                Today
              </li>
              {DAYS_OF_WEEK.map((day) => (
                <li
                  key={day}
                  className="hourly-forecast__day-option"
                  role="option"
                  aria-selected={selectedDay === day}
                  onClick={() => handleSelectDay(day)}
                >
                  {day}
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>

      {/* Scrollable list from midnight to 11 PM */}
      <ul className="hourly-forecast__list">
        {hours.map((hour, index) => (
          <li key={index} className="hourly-forecast__item">
            <div className="hourly-forecast__time">{hour.label}</div>

            <div className="hourly-forecast__icon" aria-hidden="true">
              {/* TODO: map from data.hourly.weathercode later */}
              ☀️
            </div>

            <div className="hourly-forecast__temp">
              {hour.temp !== null ? `${hour.temp}${unitLabel}` : `–${unitLabel}`}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default HourlyForecast;