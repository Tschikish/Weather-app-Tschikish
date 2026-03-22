import {
  windUnitLabel,
  precipUnitLabel,
  type UnitSettings,
} from "../utils/units";

type StatsProps = {
  data: any;
  units: UnitSettings;
};

const Stats = ({ data, units }: StatsProps) => {
  const windLabel = windUnitLabel(units.windSpeed);
  const precipLabel = precipUnitLabel(units.precipitation);

  const now = new Date();
  const currentHour = now.toISOString().slice(0, 13) + ":00";

  const currentIndex =
    data?.hourly?.time?.findIndex((time: string) => time === currentHour) ?? -1;

  const safeIndex = currentIndex >= 0 ? currentIndex : 0;

  const feelsLike = data?.hourly?.temperature_2m?.[safeIndex] ?? "--";
  const humidity = data?.hourly?.relative_humidity_2m?.[safeIndex] ?? "--";
  const wind = data?.hourly?.windspeed_10m?.[safeIndex] ?? "--";
  const precipitation = data?.hourly?.precipitation?.[safeIndex] ?? "--";

  return (
    <section className="weather-stats-row">
      <div
        className={`weather-stat-card ${feelsLike === "--" ? "weather-stat-card--loading" : ""}`}
      >
        <p className="weather-stat-card__label">Feels like</p>
        <p className="weather-stat-card__value">
          {feelsLike === "--" ? "--" : `${Math.round(feelsLike)}°`}
        </p>
      </div>

      <div
        className={`weather-stat-card ${feelsLike === "--" ? "weather-stat-card--loading" : ""}`}
      >
        <p className="weather-stat-card__label">Humidity</p>
        <p className="weather-stat-card__value">
          {humidity === "--" ? "--" : `${humidity}%`}
        </p>
      </div>

      <div
        className={`weather-stat-card ${feelsLike === "--" ? "weather-stat-card--loading" : ""}`}
      >
        <p className="weather-stat-card__label">Wind</p>
        <p className="weather-stat-card__value">
          {wind === "--" ? "--" : `${Math.round(wind)} ${windLabel}`}
        </p>
      </div>

      <div
        className={`weather-stat-card ${feelsLike === "--" ? "weather-stat-card--loading" : ""}`}
      >
        <p className="weather-stat-card__label">Precipitation</p>
        <p className="weather-stat-card__value">
          {precipitation === "--" ? "--" : `${precipitation} ${precipLabel}`}
        </p>
      </div>
    </section>
  );
};

export default Stats;
