import {
  convertTemp,
  convertWind,
  convertPrecip,
  windUnitLabel,
  precipUnitLabel,
  tempUnitLabel,
  type UnitSettings,
} from "../utils/units";

type StatsProps = {
  data: any;
  units: UnitSettings;
};

const Stats = ({ data, units }: StatsProps) => {
  const tempLabel = tempUnitLabel(units.temperature);
  const windLabel = windUnitLabel(units.windSpeed);
  const precipLabel = precipUnitLabel(units.precipitation);

  const now = new Date();
  const currentHour = now.toISOString().slice(0, 13) + ":00";

  const currentIndex =
    data?.hourly?.time?.findIndex((time: string) => time === currentHour) ?? -1;

  const safeIndex = currentIndex >= 0 ? currentIndex : 0;

  const rawFeelsLike = data?.hourly?.temperature_2m?.[safeIndex];
  const rawHumidity = data?.hourly?.relative_humidity_2m?.[safeIndex];
  const rawWind = data?.hourly?.windspeed_10m?.[safeIndex];
  const rawPrecipitation = data?.hourly?.precipitation?.[safeIndex];

  const feelsLike =
    typeof rawFeelsLike === "number"
      ? convertTemp(rawFeelsLike, units.temperature)
      : "--";

  const humidity = typeof rawHumidity === "number" ? rawHumidity : "--";

  const wind =
    typeof rawWind === "number" ? convertWind(rawWind, units.windSpeed) : "--";

  const precipitation =
    typeof rawPrecipitation === "number"
      ? convertPrecip(rawPrecipitation, units.precipitation)
      : "--";

  return (
    <section className="weather-stats-row">
      <div
        className={`weather-stat-card ${feelsLike === "--" ? "weather-stat-card--loading" : ""}`}
      >
        <p className="weather-stat-card__label">Feels like</p>
        <p className="weather-stat-card__value">
          {feelsLike === "--" ? "--" : `${Math.round(feelsLike)}${tempLabel}`}
        </p>
      </div>

      <div
        className={`weather-stat-card ${humidity === "--" ? "weather-stat-card--loading" : ""}`}
      >
        <p className="weather-stat-card__label">Humidity</p>
        <p className="weather-stat-card__value">
          {humidity === "--" ? "--" : `${Math.round(humidity)}%`}
        </p>
      </div>

      <div
        className={`weather-stat-card ${wind === "--" ? "weather-stat-card--loading" : ""}`}
      >
        <p className="weather-stat-card__label">Wind</p>
        <p className="weather-stat-card__value">
          {wind === "--" ? "--" : `${Math.round(wind)} ${windLabel}`}
        </p>
      </div>

      <div
        className={`weather-stat-card ${precipitation === "--" ? "weather-stat-card--loading" : ""}`}
      >
        <p className="weather-stat-card__label">Precipitation</p>
        <p className="weather-stat-card__value">
          {precipitation === "--"
            ? "--"
            : `${precipitation.toFixed(units.precipitation === "inch" ? 2 : 1)} ${precipLabel}`}
        </p>
      </div>
    </section>
  );
};

export default Stats;
