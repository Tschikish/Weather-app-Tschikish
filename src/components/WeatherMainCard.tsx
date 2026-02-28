import bgImageLRG from "../assets/images/bg-today-large.svg";
import type { Units } from "../hooks/useWeatherQuery";
import { convertTemp, tempUnitLabel } from "../utils/units";

type WeatherMainCardProps = {
  data: any;
  units: Units;
};

const WeatherMainCard = ({ data, units }: WeatherMainCardProps) => {
  if (!data) {
    return (
      <section
        className="weather-main-card"
        style={{ backgroundImage: `url(${bgImageLRG})` }}
      >
        <div className="weather-main-card__body">
          <div className="weather-main-card__location">
            <p className="weather-main-card__city">Select a city</p>
            <p className="weather-main-card__date">&nbsp;</p>
          </div>

          <div className="weather-main-card__summary">
            <div className="weather-main-card__icon" aria-hidden="true">
              ☀️
            </div>
            <p className="weather-main-card__temp">
              <span className="weather-main-card__temp-value">–</span>
              <span className="weather-main-card__temp-unit">
                {tempUnitLabel(units)}
              </span>
            </p>
          </div>
        </div>
      </section>
    );
  }

  // crude "current" temperature example (you can refine which index you use)
  const rawTempC =
    data?.hourly?.temperature_2m?.[0] ??
    data?.daily?.temperature_2m_max?.[0] ??
    0;

  const convertedTemp = Math.round(convertTemp(rawTempC, units));
  const unitLabel = tempUnitLabel(units);

  return (
    <section
      className="weather-main-card"
      style={{ backgroundImage: `url(${bgImageLRG})` }}
    >
      <div className="weather-main-card__body">
        <div className="weather-main-card__location">
          <p className="weather-main-card__city">
            {/* Later: pass city name from App */}
            Current location
          </p>
          <p className="weather-main-card__date">Tuesday, Aug 5, 2025</p>
        </div>

        <div className="weather-main-card__summary">
          <div className="weather-main-card__icon" aria-hidden="true">
            ☀️
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