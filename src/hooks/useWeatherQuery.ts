import { useQuery } from "@tanstack/react-query";

export type Units = "metric" | "imperial";

export interface UseWeatherQueryOptions {
  latitude: number;
  longitude: number;
  units?: Units;
}

const buildWeatherUrl = (latitude: number, longitude: number, units: Units) => {
  const isMetric = units === "metric";

  const searchParams = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    hourly:
      "temperature_2m,relative_humidity_2m,precipitation,windspeed_10m,weathercode",
    daily:
      "weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum",
    timezone: "auto",
    temperature_unit: isMetric ? "celsius" : "fahrenheit",
    windspeed_unit: isMetric ? "kmh" : "mph",
    precipitation_unit: "mm",
  });

  return `https://api.open-meteo.com/v1/forecast?${searchParams.toString()}`;
};

async function fetchWeather(opts: UseWeatherQueryOptions) {
  const { latitude, longitude, units = "metric" } = opts;

  const url = buildWeatherUrl(latitude, longitude, units);
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch weather data");
  }

  // For now be lazy with typing – refine later
  const data = await res.json();
  return data as any;
}

/**
 * Basic hook for fetching weather data with TanStack Query.
 * You pass in lat/lon + units. Query is disabled until both coords are present.
 */
export function useWeatherQuery(options: UseWeatherQueryOptions | null) {
  return useQuery({
    queryKey: ["weather", options],
    queryFn: () => {
      if (!options) {
        throw new Error("Missing coordinates");
      }
      return fetchWeather(options);
    },
    
    enabled: !!options && !!options.latitude && !!options.longitude,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
