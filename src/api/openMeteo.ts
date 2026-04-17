import type { CityOption } from "../types/location";
import type {
  WeatherCoordinates,
  WeatherForecastResponse,
} from "../types/weather";

const WEATHER_API_URL = "https://api.open-meteo.com/v1/forecast";
const GEOCODING_API_URL = "https://geocoding-api.open-meteo.com/v1/search";

type GeocodingResult = {
  id: number;
  name: string;
  country: string;
  country_code?: string;
  admin1?: string;
  latitude: number;
  longitude: number;
  timezone?: string;
};

type GeocodingResponse = {
  results?: GeocodingResult[];
  error?: boolean;
  reason?: string;
};

const fetchJson = async <T>(url: string, signal?: AbortSignal): Promise<T> => {
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return (await response.json()) as T;
};

const mapCityOption = (city: GeocodingResult): CityOption => ({
  id: city.id,
  name: city.name,
  country: city.country,
  countryCode: city.country_code,
  admin1: city.admin1,
  latitude: city.latitude,
  longitude: city.longitude,
  timezone: city.timezone,
});

export const DEFAULT_LOCATION: CityOption = {
  id: 792680,
  name: "Belgrade",
  country: "Serbia",
  admin1: "Central Serbia",
  latitude: 44.80401,
  longitude: 20.46513,
  timezone: "Europe/Belgrade",
};

export const searchCities = async (
  query: string,
  signal?: AbortSignal,
): Promise<CityOption[]> => {
  const trimmedQuery = query.trim();

  if (trimmedQuery.length < 2) {
    return [];
  }

  const searchParams = new URLSearchParams({
    name: trimmedQuery,
    count: "6",
    language: "en",
    format: "json",
  });

  const data = await fetchJson<GeocodingResponse>(
    `${GEOCODING_API_URL}?${searchParams.toString()}`,
    signal,
  );

  if (data.error) {
    throw new Error(data.reason ?? "Failed to search cities");
  }

  return (data.results ?? []).map(mapCityOption);
};

export const fetchWeatherForecast = async (
  coordinates: WeatherCoordinates,
  signal?: AbortSignal,
): Promise<WeatherForecastResponse> => {
  const searchParams = new URLSearchParams({
    latitude: coordinates.latitude.toString(),
    longitude: coordinates.longitude.toString(),
    current:
      "temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,weather_code,wind_speed_10m",
    hourly:
      "temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,weather_code,wind_speed_10m",
    daily:
      "weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum",
    forecast_days: "7",
    timezone: coordinates.timezone ?? "auto",
    temperature_unit: "celsius",
    wind_speed_unit: "kmh",
    precipitation_unit: "mm",
  });

  return fetchJson<WeatherForecastResponse>(
    `${WEATHER_API_URL}?${searchParams.toString()}`,
    signal,
  );
};