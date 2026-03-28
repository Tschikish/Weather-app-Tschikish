import sunny from "../../assets/images/icon-sunny.webp";
import partlyCloudy from "../../assets/images/icon-partly-cloudy.webp";
import overcast from "../../assets/images/icon-overcast.webp";
import drizzle from "../../assets/images/icon-drizzle.webp";
import rain from "../../assets/images/icon-rain.webp";
import snow from "../../assets/images/icon-snow.webp";
import fog from "../../assets/images/icon-fog.webp";
import storm from "../../assets/images/icon-storm.webp";

import { weatherCodeToKey, type WeatherIconKey } from "./weatherCodeToIcon";

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

export const weatherCodeToIcon = (code: number | null | undefined) => {
  return weatherIcons[weatherCodeToKey(code)];
};
