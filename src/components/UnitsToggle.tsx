import { useState, useRef, useEffect } from "react";

type Mode = "metric" | "imperial";

const UnitsToggle = () => {
  const [isOpen, setIsOpen] = useState(false);

  // top-level mode
  const [mode, setMode] = useState<Mode>("metric");

  // per-section selections
  const [temperature, setTemperature] = useState<"celsius" | "fahrenheit">(
    "celsius"
  );
  const [windSpeed, setWindSpeed] = useState<"kmh" | "mph">("kmh");
  const [precipitation, setPrecipitation] = useState<"mm" | "inch">("mm");

  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleModeToggle = () => {
    setMode((prev) => {
      const next = prev === "metric" ? "imperial" : "metric";

      // optional: sync sub-units when switching mode
      if (next === "metric") {
        setTemperature("celsius");
        setWindSpeed("kmh");
        setPrecipitation("mm");
      } else {
        setTemperature("fahrenheit");
        setWindSpeed("mph");
        setPrecipitation("inch");
      }

      return next;
    });
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
              onClick={() => setTemperature("celsius")}
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
              onClick={() => setTemperature("fahrenheit")}
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
              onClick={() => setWindSpeed("kmh")}
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
              onClick={() => setWindSpeed("mph")}
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
              onClick={() => setPrecipitation("mm")}
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
              onClick={() => setPrecipitation("inch")}
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