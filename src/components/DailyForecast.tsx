import type { Units } from "../hooks/useWeatherQuery";
import { tempUnitLabel } from "../utils/units";

type DailyForecastProps = {
  data: any;
  units: Units;
};

const DailyForecast = ({ data, units }: DailyForecastProps) => {
  const unit = tempUnitLabel(units);

  return (
    <section className="daily-forecast">
      <h2 className="section-title">Daily forecast</h2>

      <div className="daily-forecast__list">
        {/* Placeholder days; later fill from `data.daily` */}
        <article className="daily-forecast__item">
          <p className="daily-forecast__day">Tue</p>
          <div className="daily-forecast__icon" aria-hidden="true">
            🌧️
          </div>
          <p className="daily-forecast__temps">
            <span>20{unit}</span>
            <span>14{unit}</span>
          </p>
        </article>

        <article className="daily-forecast__item">
          <p className="daily-forecast__day">Wed</p>
          <div className="daily-forecast__icon" aria-hidden="true">
            ☀️
          </div>
          <p className="daily-forecast__temps">
            <span>22{unit}</span>
            <span>15{unit}</span>
          </p>
        </article>
      </div>
    </section>
  );
};

export default DailyForecast;