import { useQuery } from "@tanstack/react-query";
import { fetchWeatherForecast } from "../api/openMeteo";
import type {
  WeatherCoordinates,
  WeatherForecastResponse,
} from "../types/weather";

export function useWeatherQuery(options: WeatherCoordinates | null) {
  return useQuery({
    queryKey: options
      ? ["weather", options.latitude, options.longitude, options.timezone ?? "auto"]
      : ["weather", "idle"],
    queryFn: ({ signal }): Promise<WeatherForecastResponse> => {
      if (!options) {
        throw new Error("Missing coordinates");
      }

      return fetchWeatherForecast(options, signal);
    },
    enabled: options !== null,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 1,
  });
}
