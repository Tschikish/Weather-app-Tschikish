import { useState, useRef, useEffect } from "react";
import type { Units } from "../hooks/useWeatherQuery";
import type {
  UnitSettings,
  TemperatureUnit,
  WindSpeedUnit,
  PrecipitationUnit,
} from "../utils/units";
import { METRIC_UNIT_SETTINGS, IMPERIAL_UNIT_SETTINGS } from "../utils/units";
import UnitsIcon from "../assets/images/icon-units.svg";
import CheckIcon from "../assets/images/icon-checkmark.svg";
import DropdownIcon from "../assets/images/icon-dropdown.svg";


type UnitsToggleProps = {
  mode: Units;
  onModeChange: (mode: Units) => void;
  unitSettings: UnitSettings;
  onUnitSettingsChange: (settings: UnitSettings) => void;
};

const UnitsToggle = ({
  mode,
  onModeChange,
  unitSettings,
  onUnitSettingsChange,
}: UnitsToggleProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleModeToggle = () => {
    const next = mode === "metric" ? "imperial" : "metric";
    onModeChange(next);

    if (next === "metric") {
      onUnitSettingsChange(METRIC_UNIT_SETTINGS);
    } else {
      onUnitSettingsChange(IMPERIAL_UNIT_SETTINGS);
    }
  };

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

  const selectTemperature = (value: TemperatureUnit) => {
    onUnitSettingsChange({
      ...unitSettings,
      temperature: value,
    });
  };

  const selectWindSpeed = (value: WindSpeedUnit) => {
    onUnitSettingsChange({
      ...unitSettings,
      windSpeed: value,
    });
  };

  const selectPrecipitation = (value: PrecipitationUnit) => {
    onUnitSettingsChange({
      ...unitSettings,
      precipitation: value,
    });
  };

  const { temperature, windSpeed, precipitation } = unitSettings;

  return (
    <div className="units-toggle" ref={wrapperRef}>
      <button
        className="units-toggle__button"
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={toggleDropdown}
      >
        <span>
          <img src={UnitsIcon} alt="Unit-toggle-button" />
        </span>
        <span>Units</span>
        <span className="units-toggle__chevron" aria-hidden="true">
          <img src={DropdownIcon} style={{ width: 10, height: 10 }} />
        </span>
      </button>

      <div
        className={`units-toggle__dropdown ${isOpen ? "is-open" : ""}`}
        aria-hidden={!isOpen}
      >
        <button
          type="button"
          className="units-toggle__mode-button"
          onClick={handleModeToggle}
        >
          {mode === "metric" ? "Switch to Imperial" : "Switch to Metric"}
        </button>

        <div className="units-toggle__section">
          <div className="units-toggle__section-header">
            <h3>Temperature</h3>
          </div>
          <div className="units-toggle__options">
            <button
              type="button"
              className={`units-toggle__option ${
                temperature === "celsius" ? "is-selected" : ""
              }`}
              onClick={() => selectTemperature("celsius")}
            >
              <span>Celsius (°C)</span>
              {temperature === "celsius" && (
                <span className="units-toggle__check">
                  <img src={CheckIcon} alt="check-icon" />
                </span>
              )}
            </button>

            <button
              type="button"
              className={`units-toggle__option ${
                temperature === "fahrenheit" ? "is-selected" : ""
              }`}
              onClick={() => selectTemperature("fahrenheit")}
            >
              <span>Fahrenheit (°F)</span>
              {temperature === "fahrenheit" && (
                <span className="units-toggle__check">
                  <img src={CheckIcon} alt="check-icon" />
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="units-toggle__section">
          <div className="units-toggle__section-header">
            <h3>Wind speed</h3>
          </div>
          <div className="units-toggle__options">
            <button
              type="button"
              className={`units-toggle__option ${
                windSpeed === "kmh" ? "is-selected" : ""
              }`}
              onClick={() => selectWindSpeed("kmh")}
            >
              <span>km/h</span>
              {windSpeed === "kmh" && (
                <span className="units-toggle__check">
                  <img src={CheckIcon} alt="check-icon" />
                </span>
              )}
            </button>

            <button
              type="button"
              className={`units-toggle__option ${
                windSpeed === "mph" ? "is-selected" : ""
              }`}
              onClick={() => selectWindSpeed("mph")}
            >
              <span>mph</span>
              {windSpeed === "mph" && (
                <span className="units-toggle__check">
                  <img src={CheckIcon} alt="check-icon" />
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="units-toggle__section">
          <div className="units-toggle__section-header">
            <h3>Precipitation</h3>
          </div>
          <div className="units-toggle__options">
            <button
              type="button"
              className={`units-toggle__option ${
                precipitation === "mm" ? "is-selected" : ""
              }`}
              onClick={() => selectPrecipitation("mm")}
            >
              <span>Millimeters (mm)</span>
              {precipitation === "mm" && (
                <span className="units-toggle__check">
                  <img src={CheckIcon} alt="check-icon" />
                </span>
              )}
            </button>

            <button
              type="button"
              className={`units-toggle__option ${
                precipitation === "inch" ? "is-selected" : ""
              }`}
              onClick={() => selectPrecipitation("inch")}
            >
              <span>Inches (in)</span>
              {precipitation === "inch" && (
                <span className="units-toggle__check">
                  <img src={CheckIcon} alt="check-icon" />
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnitsToggle;
