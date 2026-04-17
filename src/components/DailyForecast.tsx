import type { WeatherForecastResponse } from "../types/weather";
import {
  formatWeatherDateLabel,
  getDailyForecastItems,
} from "../utils/weatherData";
import { weatherCodeToIcon } from "../utils/weatherIcons";
import { convertTemp, tempUnitLabel, type UnitSettings } from "../utils/units";

type DailyForecastProps = {
  data: WeatherForecastResponse | undefined;
  units: UnitSettings;
};

const DailyForecast = ({ data, units }: DailyForecastProps) => {
  const unitLabel = tempUnitLabel(units.temperature);
  const items = getDailyForecastItems(data);

  return (
    <section className="daily-forecast">
      <h2 className="section-title">Daily forecast</h2>

      <div className="daily-forecast__list">
        {items.map((item) => {
          const maxTemp =
            item.maxTemp !== null
              ? Math.round(convertTemp(item.maxTemp, units.temperature))
              : null;
          const minTemp =
            item.minTemp !== null
              ? Math.round(convertTemp(item.minTemp, units.temperature))
              : null;

          return (
            <article className="daily-forecast__item" key={item.date}>
              <p className="daily-forecast__day">
                {formatWeatherDateLabel(item.date, { weekday: "short" })}
              </p>

              <div className="daily-forecast__icon" aria-hidden="true">
                <img src={weatherCodeToIcon(item.weatherCode)} alt="" />
              </div>

              <p className="daily-forecast__temps">
                <span>{maxTemp !== null ? `${maxTemp}${unitLabel}` : "--"}</span>
                <span>{minTemp !== null ? `${minTemp}${unitLabel}` : "--"}</span>
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default DailyForecast;