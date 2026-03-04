// src/utils/units.ts

export type TemperatureUnit = "celsius" | "fahrenheit";
export type WindSpeedUnit = "kmh" | "mph";
export type PrecipitationUnit = "mm" | "inch";

export type UnitSettings = {
  temperature: TemperatureUnit;
  windSpeed: WindSpeedUnit;
  precipitation: PrecipitationUnit;
};

export const METRIC_UNIT_SETTINGS: UnitSettings = {
  temperature: "celsius",
  windSpeed: "kmh",
  precipitation: "mm",
};

export const IMPERIAL_UNIT_SETTINGS: UnitSettings = {
  temperature: "fahrenheit",
  windSpeed: "mph",
  precipitation: "inch",
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

export function tempUnitLabel(unit: TemperatureUnit): "°C" | "°F" {
  return unit === "celsius" ? "°" : "°";
}

export function windUnitLabel(unit: WindSpeedUnit): "km/h" | "mph" {
  return unit === "kmh" ? "km/h" : "mph";
}

export function precipUnitLabel(unit: PrecipitationUnit): "mm" | "in" {
  return unit === "mm" ? "mm" : "in";
}