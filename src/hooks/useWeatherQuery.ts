import { useQuery } from "@tanstack/react-query";

export type Units = "metric" | "imperial";

export interface UseWeatherQueryOptions {
  latitude: number;
  longitude: number;
}

const buildWeatherUrl = (latitude: number, longitude: number) => {
  const searchParams = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    hourly:
      "temperature_2m,relative_humidity_2m,precipitation,windspeed_10m,weathercode",
    daily:
      "weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum",
    timezone: "auto",
    // always fetch metric
    temperature_unit: "celsius",
    windspeed_unit: "kmh",
    precipitation_unit: "mm",
  });

  return `https://api.open-meteo.com/v1/forecast?${searchParams.toString()}`;
};

async function fetchWeather(options: UseWeatherQueryOptions) {
  const { latitude, longitude } = options;
  const url = buildWeatherUrl(latitude, longitude);

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch weather data");
  }

  const data = await res.json();
  return data;
}

export function useWeatherQuery(options: UseWeatherQueryOptions | null) {
  return useQuery({
    queryKey: options
      ? ["weather", options.latitude, options.longitude]
      : ["weather", "no-coords"],
    queryFn: () => {
      if (!options) {
        throw new Error("Missing coordinates");
      }
      return fetchWeather(options);
    },
    enabled: !!options && !!options.latitude && !!options.longitude,
    staleTime: 5 * 60 * 1000,
  });
}