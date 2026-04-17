import { weatherCodeToIcon, weatherIcons, type WeatherIconKey } from "./weatherIcons";

export type { WeatherIconKey };

export const weatherCodeToKey = (
  code: number | null | undefined,
): WeatherIconKey =>
  (Object.keys(weatherIcons) as WeatherIconKey[]).find(
    (key) => weatherIcons[key] === weatherCodeToIcon(code),
  ) ?? "overcast";
