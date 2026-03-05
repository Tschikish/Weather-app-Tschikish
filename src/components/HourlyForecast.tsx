import { useState, useRef, useEffect, useMemo } from "react";
import { tempUnitLabel, convertTemp, type UnitSettings } from "../utils/units";

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
  units: UnitSettings;
};

type HourEntry = {
  label: string;
  temp: number | null;
};

const HourlyForecast = ({ data, units }: HourlyForecastProps) => {
  const [selectedDay, setSelectedDay] = useState<string>("Today");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const unitLabel = tempUnitLabel(units.temperature);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelectDay = (day: string) => {
    setSelectedDay(day);
    setIsOpen(false);
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

  const hours: HourEntry[] = useMemo(() => {
    const times: string[] | undefined = data?.hourly?.time;
    const tempsC: number[] | undefined = data?.hourly?.temperature_2m;

    const formatter = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      hour12: true,
    });

    if (!Array.isArray(times) || !Array.isArray(tempsC)) {
      return Array.from({ length: 24 }, (_, hour) => ({
        label: formatter.format(new Date(1970, 0, 1, hour, 0, 0)),
        temp: null,
      }));
    }

    return times.slice(0, 24).map((isoString, index) => {
      const date = new Date(isoString);
      const rawC = typeof tempsC[index] === "number" ? tempsC[index] : null;
      const converted =
        rawC !== null ? Math.round(convertTemp(rawC, units.temperature)) : null;

      return {
        label: formatter.format(date),
        temp: converted,
      };
    });
  }, [data, units.temperature]);

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

      <ul className="hourly-forecast__list">
        {hours.map((hour, index) => (
          <li key={index} className="hourly-forecast__item">
            <div className="hourly-forecast__time">{hour.label}</div>

            <div className="hourly-forecast__icon" aria-hidden="true">
              ☀️
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
