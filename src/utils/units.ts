export type UnitSystem = "metric" | "imperial";
export type TemperatureUnit = "celsius" | "fahrenheit";
export type WindSpeedUnit = "kmh" | "mph";
export type PrecipitationUnit = "mm" | "inch";

export type UnitSettings = {
  temperature: TemperatureUnit;
  windSpeed: WindSpeedUnit;
  precipitation: PrecipitationUnit;
};

export const METRIC_UNIT_SETTINGS = {
  temperature: "celsius",
  windSpeed: "kmh",
  precipitation: "mm",
} satisfies UnitSettings;

export const IMPERIAL_UNIT_SETTINGS = {
  temperature: "fahrenheit",
  windSpeed: "mph",
  precipitation: "inch",
} satisfies UnitSettings;

const UNIT_SYSTEM_SETTINGS: Record<UnitSystem, UnitSettings> = {
  metric: METRIC_UNIT_SETTINGS,
  imperial: IMPERIAL_UNIT_SETTINGS,
};

export function convertTemp(
  valueCelsius: number,
  unit: TemperatureUnit,
): number {
  if (unit === "celsius") return valueCelsius;
  return (valueCelsius * 9) / 5 + 32;
}

export function convertWind(valueKmh: number, unit: WindSpeedUnit): number {
  if (unit === "kmh") return valueKmh;
  return valueKmh / 1.60934;
}

export function convertPrecip(
  valueMm: number,
  unit: PrecipitationUnit,
): number {
  if (unit === "mm") return valueMm;
  return valueMm / 25.4;
}

export function getUnitSettingsForSystem(system: UnitSystem): UnitSettings {
  return { ...UNIT_SYSTEM_SETTINGS[system] };
}

export function getMatchingUnitSystem(
  settings: UnitSettings,
): UnitSystem | null {
  if (
    settings.temperature === METRIC_UNIT_SETTINGS.temperature &&
    settings.windSpeed === METRIC_UNIT_SETTINGS.windSpeed &&
    settings.precipitation === METRIC_UNIT_SETTINGS.precipitation
  ) {
    return "metric";
  }

  if (
    settings.temperature === IMPERIAL_UNIT_SETTINGS.temperature &&
    settings.windSpeed === IMPERIAL_UNIT_SETTINGS.windSpeed &&
    settings.precipitation === IMPERIAL_UNIT_SETTINGS.precipitation
  ) {
    return "imperial";
  }

  return null;
}

export function tempUnitLabel(unit: TemperatureUnit): "°C" | "°F" {
  return unit === "celsius" ? "°C" : "°F";
}

export function windUnitLabel(unit: WindSpeedUnit): "km/h" | "mph" {
  return unit === "kmh" ? "km/h" : "mph";
}

export function precipUnitLabel(unit: PrecipitationUnit): "mm" | "in" {
  return unit === "mm" ? "mm" : "in";
}
