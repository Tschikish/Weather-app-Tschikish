import { useState, useRef, useEffect } from "react";
import type { Units } from "../hooks/useWeatherQuery";

type UnitsToggleProps = {
  mode: Units; // "metric" | "imperial"
  onModeChange: (mode: Units) => void;
};

const UnitsToggle = ({ mode, onModeChange }: UnitsToggleProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [temperature, setTemperature] = useState<"celsius" | "fahrenheit">(
    "celsius",
  );
  const [windSpeed, setWindSpeed] = useState<"kmh" | "mph">("kmh");
  const [precipitation, setPrecipitation] = useState<"mm" | "inch">("mm");

  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleModeToggle = () => {
    const next = mode === "metric" ? "imperial" : "metric";

    // keep sub-units in sync with global mode
    if (next === "metric") {
      setTemperature("celsius");
      setWindSpeed("kmh");
      setPrecipitation("mm");
    } else {
      setTemperature("fahrenheit");
      setWindSpeed("mph");
      setPrecipitation("inch");
    }

    onModeChange(next);
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Helper: picking a temperature unit implies global mode
  // Remove this Caki
  const selectTemperature = (value: "celsius" | "fahrenheit") => {
    setTemperature(value);
    if (value === "celsius" && mode !== "metric") {
      onModeChange("metric");
      setWindSpeed("kmh");
      setPrecipitation("mm");
    }
    if (value === "fahrenheit" && mode !== "imperial") {
      onModeChange("imperial");
      setWindSpeed("mph");
      setPrecipitation("inch");
    }
  };

  const selectWindSpeed = (value: "kmh" | "mph") => {
    setWindSpeed(value);
    if (value === "kmh" && mode !== "metric") {
      onModeChange("metric");
      setTemperature("celsius");
      setPrecipitation("mm");
    }
    if (value === "mph" && mode !== "imperial") {
      onModeChange("imperial");
      setTemperature("fahrenheit");
      setPrecipitation("inch");
    }
  };

  const selectPrecipitation = (value: "mm" | "inch") => {
    setPrecipitation(value);
    if (value === "mm" && mode !== "metric") {
      onModeChange("metric");
      setTemperature("celsius");
      setWindSpeed("kmh");
    }
    if (value === "inch" && mode !== "imperial") {
      onModeChange("imperial");
      setTemperature("fahrenheit");
      setWindSpeed("mph");
    }
  };

  return (
    <div className="units-toggle" ref={wrapperRef}>
      <button
        className="units-toggle__button"
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={toggleDropdown}
      >
        <span>Units</span>
        <span className="units-toggle__chevron" aria-hidden="true">
          ▾
        </span>
      </button>

      {isOpen && (
        <div className="units-toggle__dropdown">
          {/* Top mode switch */}
          <button
            type="button"
            className="units-toggle__mode-btn"
            onClick={handleModeToggle}
          >
            {mode === "metric" ? "Switch to Imperial" : "Switch to Metric"}
          </button>

          <div className="units-toggle__section">
            <span className="units-toggle__section-title">Temperature</span>

            <button
              type="button"
              className={`units-toggle__option ${
                temperature === "celsius" ? "is-active" : ""
              }`}
              onClick={() => selectTemperature("celsius")}
              role="option"
              aria-selected={temperature === "celsius"}
            >
              <span>Celsius (°C)</span>
              {temperature === "celsius" && (
                <span className="units-toggle__check">✓</span>
              )}
            </button>

            <button
              type="button"
              className={`units-toggle__option ${
                temperature === "fahrenheit" ? "is-active" : ""
              }`}
              onClick={() => selectTemperature("fahrenheit")}
              role="option"
              aria-selected={temperature === "fahrenheit"}
            >
              <span>Fahrenheit (°F)</span>
              {temperature === "fahrenheit" && (
                <span className="units-toggle__check">✓</span>
              )}
            </button>
          </div>

          <div className="units-toggle__section">
            <span className="units-toggle__section-title">Wind Speed</span>

            <button
              type="button"
              className={`units-toggle__option ${
                windSpeed === "kmh" ? "is-active" : ""
              }`}
              onClick={() => selectWindSpeed("kmh")}
              role="option"
              aria-selected={windSpeed === "kmh"}
            >
              <span>km/h</span>
              {windSpeed === "kmh" && (
                <span className="units-toggle__check">✓</span>
              )}
            </button>

            <button
              type="button"
              className={`units-toggle__option ${
                windSpeed === "mph" ? "is-active" : ""
              }`}
              onClick={() => selectWindSpeed("mph")}
              role="option"
              aria-selected={windSpeed === "mph"}
            >
              <span>mph</span>
              {windSpeed === "mph" && (
                <span className="units-toggle__check">✓</span>
              )}
            </button>
          </div>

          <div className="units-toggle__section">
            <span className="units-toggle__section-title">Precipitation</span>

            <button
              type="button"
              className={`units-toggle__option ${
                precipitation === "mm" ? "is-active" : ""
              }`}
              onClick={() => selectPrecipitation("mm")}
              role="option"
              aria-selected={precipitation === "mm"}
            >
              <span>Millimeters (mm)</span>
              {precipitation === "mm" && (
                <span className="units-toggle__check">✓</span>
              )}
            </button>

            <button
              type="button"
              className={`units-toggle__option ${
                precipitation === "inch" ? "is-active" : ""
              }`}
              onClick={() => selectPrecipitation("inch")}
              role="option"
              aria-selected={precipitation === "inch"}
            >
              <span>Inches (in)</span>
              {precipitation === "inch" && (
                <span className="units-toggle__check">✓</span>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnitsToggle;
