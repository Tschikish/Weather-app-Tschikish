import type { Units } from "../hooks/useWeatherQuery";
import { windUnitLabel, precipUnitLabel } from "../utils/units";

type StatsProps = {
  data: any;
  units: Units;
};

const Stats = ({ data, units }: StatsProps) => {
  const windLabel = windUnitLabel(units);
  const precipLabel = precipUnitLabel(units);

  // later: derive feelsLike / humidity / wind / precip from `data` and convert
  return (
    <section className="weather-stats-row">
      <div className="weather-stat-card">
        <p className="weather-stat-card__label">Feels Like</p>
        <p className="weather-stat-card__value">18°</p>
      </div>

      <div className="weather-stat-card">
        <p className="weather-stat-card__label">Humidity</p>
        <p className="weather-stat-card__value">46%</p>
      </div>

      <div className="weather-stat-card">
        <p className="weather-stat-card__label">Wind</p>
        <p className="weather-stat-card__value">14 {windLabel}</p>
      </div>

      <div className="weather-stat-card">
        <p className="weather-stat-card__label">Precipitation</p>
        <p className="weather-stat-card__value">0 {precipLabel}</p>
      </div>
    </section>
  );
};

export default Stats;