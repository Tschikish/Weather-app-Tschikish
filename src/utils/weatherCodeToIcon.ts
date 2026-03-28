export type WeatherIconKey =
  | "sunny"
  | "partlyCloudy"
  | "overcast"
  | "fog"
  | "drizzle"
  | "rain"
  | "snow"
  | "storm";

export const weatherCodeToKey = (
  code: number | null | undefined,
): WeatherIconKey => {
  if (code === 0) return "sunny";
  if ([1, 2].includes(code ?? -1)) return "partlyCloudy";
  if (code === 3) return "overcast";
  if ([45, 48].includes(code ?? -1)) return "fog";
  if ([51, 53, 55].includes(code ?? -1)) return "drizzle";
  if ([61, 63, 65, 80, 81, 82].includes(code ?? -1)) return "rain";
  if ([71, 73, 75, 85, 86].includes(code ?? -1)) return "snow";
  if ([95, 96, 99].includes(code ?? -1)) return "storm";

  return "sunny";
};
