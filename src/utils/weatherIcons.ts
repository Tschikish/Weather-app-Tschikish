import sunny from "../assets/images/icon-sunny.webp";
import partlyCloudy from "../assets/images/icon-partly-cloudy.webp";
import overcast from "../assets/images/icon-overcast.webp";
import drizzle from "../assets/images/icon-drizzle.webp";
import rain from "../assets/images/icon-rain.webp";
import snow from "../assets/images/icon-snow.webp";
import fog from "../assets/images/icon-fog.webp";
import storm from "../assets/images/icon-storm.webp";

export type WeatherIconKey =
  | "sunny"
  | "partlyCloudy"
  | "overcast"
  | "fog"
  | "drizzle"
  | "rain"
  | "snow"
  | "storm";

export const weatherIcons: Record<WeatherIconKey, string> = {
  sunny,
  partlyCloudy,
  overcast,
  fog,
  drizzle,
  rain,
  snow,
  storm,
};

const weatherCodeToKey = (
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

  return "overcast";
};

export const weatherCodeToIcon = (code: number | null | undefined) =>
  weatherIcons[weatherCodeToKey(code)];
