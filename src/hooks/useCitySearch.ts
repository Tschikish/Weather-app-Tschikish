import { useQuery } from "@tanstack/react-query";
import { searchCities } from "../api/openMeteo";
import type { CityOption } from "../types/location";

export const useCitySearch = (query: string) => {
  const normalizedQuery = query.trim();

  return useQuery<CityOption[]>({
    queryKey: ["city-search", normalizedQuery.toLowerCase()],
    queryFn: ({ signal }) => searchCities(normalizedQuery, signal),
    enabled: normalizedQuery.length >= 2,
    staleTime: 12 * 60 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
    retry: 1,
  });
};
