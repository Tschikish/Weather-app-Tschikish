export type WeatherCoordinates = {
  latitude: number;
  longitude: number;
  timezone?: string;
};

export type CurrentWeather = {
  time: string;
  temperature_2m?: number;
  apparent_temperature?: number;
  relative_humidity_2m?: number;
  precipitation?: number;
  weather_code?: number;
  wind_speed_10m?: number;
};

export type HourlyWeather = {
  time: string[];
  temperature_2m: number[];
  apparent_temperature: number[];
  relative_humidity_2m: number[];
  precipitation: number[];
  weather_code: number[];
  wind_speed_10m: number[];
};

export type DailyWeather = {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_sum: number[];
};

export type WeatherForecastResponse = {
  latitude: number;
  longitude: number;
  timezone: string;
  current?: CurrentWeather;
  hourly: HourlyWeather;
  daily: DailyWeather;
};