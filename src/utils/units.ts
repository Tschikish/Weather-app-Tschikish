import type { Units } from "../hooks/useWeatherQuery";

export function convertTemp(valueCelsius: number, units: Units): number {
  if (units === "metric") return valueCelsius;
  // °F = °C × 9/5 + 32
  return valueCelsius * 9/5 + 32;
}

export function convertWind(valueKmh: number, units: Units): number {
  if (units === "metric") return valueKmh;
  // mph = km/h ÷ 1.60934
  return valueKmh / 1.60934;
}

export function convertPrecip(valueMm: number, units: Units): number {
  if (units === "metric") return valueMm;
  // inches = mm ÷ 25.4
  return valueMm / 25.4;
}

export function tempUnitLabel(units: Units): "°C" | "°F" {
  return units === "metric" ? "°C" : "°F";
}

export function windUnitLabel(units: Units): "km/h" | "mph" {
  return units === "metric" ? "km/h" : "mph";
}

export function precipUnitLabel(units: Units): "mm" | "in" {
  return units === "metric" ? "mm" : "in";
}