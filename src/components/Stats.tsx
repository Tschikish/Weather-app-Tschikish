import { windUnitLabel, precipUnitLabel, type UnitSettings } from "../utils/units";

type StatsProps = {
  data: any;
  units: UnitSettings;
};

const Stats = ({ data, units }: StatsProps) => {
  const windLabel = windUnitLabel(units.windSpeed);
  const precipLabel = precipUnitLabel(units.precipitation);

  return (
    <section className="weather-stats-row">
      <div className="weather-stat-card">
        <p className="weather-stat-card__label">Feels like</p>
        <p className="weather-stat-card__value">18°</p>
      </div>

      <div className="weather-stat-card">
        <p className="weather-stat-card__label">Humidity</p>
        <p className="weather-stat-card__value">56%</p>
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