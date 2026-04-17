import bgImageLarge from "../assets/images/bg-today-large.svg";
import type { CityOption } from "../types/location";
import type { WeatherForecastResponse } from "../types/weather";
import {
  formatWeatherDateLabel,
  getCurrentWeatherSnapshot,
} from "../utils/weatherData";
import { weatherCodeToIcon } from "../utils/weatherIcons";
import { convertTemp, tempUnitLabel, type UnitSettings } from "../utils/units";

type WeatherMainCardProps = {
  data: WeatherForecastResponse | undefined;
  units: UnitSettings;
  loading: boolean;
  city: CityOption;
};

const WeatherMainCard = ({
  data,
  units,
  loading,
  city,
}: WeatherMainCardProps) => {
  const unitLabel = tempUnitLabel(units.temperature);
  const snapshot = getCurrentWeatherSnapshot(data);
  const locationLabel = `${city.name}, ${city.country}`;
  const dateLabel = formatWeatherDateLabel(
    data?.daily.time[0] ?? snapshot?.time,
    {
      weekday: "long",
      month: "short",
      day: "numeric",
    },
  );

  if (loading) {
    return (
      <section
        className="weather-main-card weather-main-card--loading"
        style={{ backgroundImage: `url(${bgImageLarge})` }}
      >
        <div className="weather-main-card__body">
          <div className="weather-main-card__location">
            <p className="weather-main-card__city">{locationLabel}</p>
            <p className="weather-main-card__date">&nbsp;</p>
          </div>

          <div className="weather-main-card__summary">
            <div className="weather-main-card__icon" />
            <p className="weather-main-card__temp">
              <span className="weather-main-card__temp-value">&nbsp;</span>
              <span className="weather-main-card__temp-unit">&nbsp;</span>
            </p>
          </div>
        </div>

        <div className="weather-main-card__loader" aria-label="Loading">
          <div className="weather-main-card__loader-dots" aria-hidden="true">
            <span className="weather-main-card__loader-dot" />
            <span className="weather-main-card__loader-dot" />
            <span className="weather-main-card__loader-dot" />
          </div>
          <p className="weather-main-card__loader-text">Loading</p>
        </div>
      </section>
    );
  }

  if (!snapshot || snapshot.temperature === null) {
    return (
      <section
        className="weather-main-card"
        style={{ backgroundImage: `url(${bgImageLarge})` }}
      >
        <div className="weather-main-card__body">
          <div className="weather-main-card__location">
            <p className="weather-main-card__city">{locationLabel}</p>
            <p className="weather-main-card__date">{dateLabel || "\u00A0"}</p>
          </div>

          <div className="weather-main-card__summary">
            <p className="weather-main-card__temp">
              <span className="weather-main-card__temp-value">--</span>
              <span className="weather-main-card__temp-unit">{unitLabel}</span>
            </p>
          </div>
        </div>
      </section>
    );
  }

  const convertedTemp = Math.round(
    convertTemp(snapshot.temperature, units.temperature),
  );

  return (
    <section
      className="weather-main-card"
      style={{ backgroundImage: `url(${bgImageLarge})` }}
    >
      <div className="weather-main-card__body">
        <div className="weather-main-card__location">
          <p
            key={city.id}
            className="weather-main-card__city weather-main-card__city--enter"
          >
            {locationLabel}
          </p>
          <p className="weather-main-card__date weather-main-card__date--enter">
            {dateLabel}
          </p>
        </div>

        <div className="weather-main-card__summary">
          <div className="weather-main-card__icon" aria-hidden="true">
            <img src={weatherCodeToIcon(snapshot.weatherCode)} alt="" />
          </div>
          <p className="weather-main-card__temp">
            <span className="weather-main-card__temp-value">
              {convertedTemp}
            </span>
            <span className="weather-main-card__temp-unit">{unitLabel}</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default WeatherMainCard;