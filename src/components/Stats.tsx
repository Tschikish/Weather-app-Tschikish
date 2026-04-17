import {
  convertTemp,
  convertWind,
  convertPrecip,
  windUnitLabel,
  precipUnitLabel,
  tempUnitLabel,
  type UnitSettings,
} from "../utils/units";
import type { WeatherForecastResponse } from "../types/weather";
import { getCurrentWeatherSnapshot } from "../utils/weatherData";

type StatsProps = {
  data: WeatherForecastResponse | undefined;
  units: UnitSettings;
};

const Stats = ({ data, units }: StatsProps) => {
  const snapshot = getCurrentWeatherSnapshot(data);

  const tempLabel = tempUnitLabel(units.temperature);
  const windLabel = windUnitLabel(units.windSpeed);
  const precipLabel = precipUnitLabel(units.precipitation);

  const feelsLikeValue = snapshot?.apparentTemperature ?? snapshot?.temperature;
  const feelsLike =
    feelsLikeValue !== null && feelsLikeValue !== undefined
      ? `${Math.round(convertTemp(feelsLikeValue, units.temperature))}${tempLabel}`
      : "--";

  const humidity =
    snapshot?.humidity !== null && snapshot?.humidity !== undefined
      ? `${Math.round(snapshot.humidity)}%`
      : "--";

  const wind =
    snapshot?.windSpeed !== null && snapshot?.windSpeed !== undefined
      ? `${Math.round(convertWind(snapshot.windSpeed, units.windSpeed))} ${windLabel}`
      : "--";

  const precipitation =
    snapshot?.precipitation !== null && snapshot?.precipitation !== undefined
      ? `${convertPrecip(
          snapshot.precipitation,
          units.precipitation,
        ).toFixed(units.precipitation === "inch" ? 2 : 1)} ${precipLabel}`
      : "--";

  const stats = [
    { label: "Feels like", value: feelsLike },
    { label: "Humidity", value: humidity },
    { label: "Wind", value: wind },
    { label: "Precipitation", value: precipitation },
  ];

  return (
    <section className="weather-stats-row">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`weather-stat-card ${
            stat.value === "--" ? "weather-stat-card--loading" : ""
          }`}
        >
          <p className="weather-stat-card__label">{stat.label}</p>
          <p className="weather-stat-card__value">{stat.value}</p>
        </div>
      ))}
    </section>
  );
};

export default Stats;