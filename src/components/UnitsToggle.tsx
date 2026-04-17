import { useEffect, useMemo, useRef, useState } from "react";
import CheckIcon from "../assets/images/icon-checkmark.svg";
import DropdownIcon from "../assets/images/icon-dropdown.svg";
import UnitsIcon from "../assets/images/icon-units.svg";
import type {
  PrecipitationUnit,
  TemperatureUnit,
  UnitSettings,
  UnitSystem,
  WindSpeedUnit,
} from "../utils/units";
import {
  getMatchingUnitSystem,
  getUnitSettingsForSystem,
} from "../utils/units";

type UnitsToggleProps = {
  unitSettings: UnitSettings;
  onUnitSettingsChange: (settings: UnitSettings) => void;
};

const UnitsToggle = ({
  unitSettings,
  onUnitSettingsChange,
}: UnitsToggleProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const selectedSystem = useMemo(
    () => getMatchingUnitSystem(unitSettings),
    [unitSettings],
  );

  const toggleDropdown = () => setIsOpen((previousValue) => !previousValue);

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

  const applyPreset = (system: UnitSystem) => {
    onUnitSettingsChange(getUnitSettingsForSystem(system));
  };

  const updateSetting = <K extends keyof UnitSettings>(
    key: K,
    value: UnitSettings[K],
  ) => {
    onUnitSettingsChange({
      ...unitSettings,
      [key]: value,
    });
  };

  const renderCheckmark = (isSelected: boolean) =>
    isSelected ? (
      <span className="units-toggle__check">
        <img src={CheckIcon} alt="" aria-hidden="true" />
      </span>
    ) : null;

  return (
    <div className="units-toggle" ref={wrapperRef}>
      <button
        className="units-toggle__button"
        type="button"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onClick={toggleDropdown}
      >
        <span aria-hidden="true">
          <img src={UnitsIcon} alt="" />
        </span>
        <span>Units</span>
        <span className="units-toggle__chevron" aria-hidden="true">
          <img src={DropdownIcon} alt="" />
        </span>
      </button>

      <div
        className={`units-toggle__dropdown ${isOpen ? "is-open" : ""}`}
        aria-hidden={!isOpen}
      >
        <div className="units-toggle__section">
          <div className="units-toggle__section-header">
            <h3>Presets</h3>
          </div>
          <div className="units-toggle__options">
            <button
              type="button"
              className={`units-toggle__option ${
                selectedSystem === "metric" ? "is-selected" : ""
              }`}
              onClick={() => applyPreset("metric")}
            >
              <span>Metric preset</span>
              {renderCheckmark(selectedSystem === "metric")}
            </button>

            <button
              type="button"
              className={`units-toggle__option ${
                selectedSystem === "imperial" ? "is-selected" : ""
              }`}
              onClick={() => applyPreset("imperial")}
            >
              <span>Imperial preset</span>
              {renderCheckmark(selectedSystem === "imperial")}
            </button>
          </div>
        </div>

        <div className="units-toggle__section">
          <div className="units-toggle__section-header">
            <h3>Temperature</h3>
          </div>
          <div className="units-toggle__options">
            <button
              type="button"
              className={`units-toggle__option ${
                unitSettings.temperature === "celsius" ? "is-selected" : ""
              }`}
              onClick={() =>
                updateSetting("temperature", "celsius" satisfies TemperatureUnit)
              }
            >
              <span>Celsius (°C)</span>
              {renderCheckmark(unitSettings.temperature === "celsius")}
            </button>

            <button
              type="button"
              className={`units-toggle__option ${
                unitSettings.temperature === "fahrenheit" ? "is-selected" : ""
              }`}
              onClick={() =>
                updateSetting(
                  "temperature",
                  "fahrenheit" satisfies TemperatureUnit,
                )
              }
            >
              <span>Fahrenheit (°F)</span>
              {renderCheckmark(unitSettings.temperature === "fahrenheit")}
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
                unitSettings.windSpeed === "kmh" ? "is-selected" : ""
              }`}
              onClick={() =>
                updateSetting("windSpeed", "kmh" satisfies WindSpeedUnit)
              }
            >
              <span>km/h</span>
              {renderCheckmark(unitSettings.windSpeed === "kmh")}
            </button>

            <button
              type="button"
              className={`units-toggle__option ${
                unitSettings.windSpeed === "mph" ? "is-selected" : ""
              }`}
              onClick={() =>
                updateSetting("windSpeed", "mph" satisfies WindSpeedUnit)
              }
            >
              <span>mph</span>
              {renderCheckmark(unitSettings.windSpeed === "mph")}
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
                unitSettings.precipitation === "mm" ? "is-selected" : ""
              }`}
              onClick={() =>
                updateSetting("precipitation", "mm" satisfies PrecipitationUnit)
              }
            >
              <span>Millimeters (mm)</span>
              {renderCheckmark(unitSettings.precipitation === "mm")}
            </button>

            <button
              type="button"
              className={`units-toggle__option ${
                unitSettings.precipitation === "inch" ? "is-selected" : ""
              }`}
              onClick={() =>
                updateSetting(
                  "precipitation",
                  "inch" satisfies PrecipitationUnit,
                )
              }
            >
              <span>Inches (in)</span>
              {renderCheckmark(unitSettings.precipitation === "inch")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnitsToggle;