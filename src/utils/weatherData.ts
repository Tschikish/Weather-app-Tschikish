import type { WeatherForecastResponse } from "../types/weather";

const getNumericValue = (value: number | undefined) =>
  typeof value === "number" ? value : null;

const getArrayNumberAt = (values: number[] | undefined, index: number) =>
  Array.isArray(values) ? getNumericValue(values[index]) : null;

const pad = (value: number) => `${value}`.padStart(2, "0");

export const formatDateKey = (date: Date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

export const parseWeatherDate = (value: string) => {
  const [datePart, timePart = "00:00"] = value.split("T");
  const [year, month, day] = datePart.split("-").map(Number);
  const [hour = 0, minute = 0] = timePart.split(":").map(Number);

  return new Date(year, month - 1, day, hour, minute);
};

export const formatWeatherDateLabel = (
  value: string | null | undefined,
  options: Intl.DateTimeFormatOptions,
) => {
  if (!value) {
    return "";
  }

  return new Intl.DateTimeFormat(undefined, options).format(
    parseWeatherDate(value),
  );
};

export type CurrentWeatherSnapshot = {
  time: string | null;
  temperature: number | null;
  apparentTemperature: number | null;
  humidity: number | null;
  precipitation: number | null;
  weatherCode: number | null;
  windSpeed: number | null;
};

export const getCurrentWeatherSnapshot = (
  data: WeatherForecastResponse | null | undefined,
): CurrentWeatherSnapshot | null => {
  if (!data) {
    return null;
  }

  const currentTime = data.current?.time ?? data.hourly.time[0] ?? null;
  const hourlyIndex = currentTime
    ? Math.max(data.hourly.time.indexOf(currentTime), 0)
    : 0;

  return {
    time: currentTime,
    temperature:
      getNumericValue(data.current?.temperature_2m) ??
      getArrayNumberAt(data.hourly.temperature_2m, hourlyIndex),
    apparentTemperature:
      getNumericValue(data.current?.apparent_temperature) ??
      getArrayNumberAt(data.hourly.apparent_temperature, hourlyIndex),
    humidity:
      getNumericValue(data.current?.relative_humidity_2m) ??
      getArrayNumberAt(data.hourly.relative_humidity_2m, hourlyIndex),
    precipitation:
      getNumericValue(data.current?.precipitation) ??
      getArrayNumberAt(data.hourly.precipitation, hourlyIndex),
    weatherCode:
      getNumericValue(data.current?.weather_code) ??
      getArrayNumberAt(data.hourly.weather_code, hourlyIndex) ??
      getArrayNumberAt(data.daily.weather_code, 0),
    windSpeed:
      getNumericValue(data.current?.wind_speed_10m) ??
      getArrayNumberAt(data.hourly.wind_speed_10m, hourlyIndex),
  };
};

export type DailyForecastItem = {
  date: string;
  weatherCode: number | null;
  maxTemp: number | null;
  minTemp: number | null;
};

export const getDailyForecastItems = (
  data: WeatherForecastResponse | null | undefined,
  days = 7,
): DailyForecastItem[] => {
  const today = new Date();

  return Array.from({ length: days }, (_, index) => {
    const fallbackDate = new Date(today);
    fallbackDate.setDate(today.getDate() + index);

    return {
      date: data?.daily.time[index] ?? formatDateKey(fallbackDate),
      weatherCode: getArrayNumberAt(data?.daily.weather_code, index),
      maxTemp: getArrayNumberAt(data?.daily.temperature_2m_max, index),
      minTemp: getArrayNumberAt(data?.daily.temperature_2m_min, index),
    };
  });
};
