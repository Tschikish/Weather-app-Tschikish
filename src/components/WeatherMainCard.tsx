import bgImageLRG from "../assets/images/bg-today-large.svg";
import { convertTemp, tempUnitLabel, type UnitSettings } from "../utils/units";

type WeatherMainCardProps = {
  data: any;
  units: UnitSettings;
  loading: boolean;
};

const WeatherMainCard = ({ data, units, loading }: WeatherMainCardProps) => {
  if (loading) {
    return (
      <section
        className="weather-main-card weather-main-card--loading"
        style={{ backgroundImage: `url(${bgImageLRG})` }}
      >
        <div className="weather-main-card__body">
          <div className="weather-main-card__location">
            <p className="weather-main-card__city">&nbsp;</p>
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

        <div className="weather-main-card__loader">Loading...</div>
      </section>
    );
  }

  if (!data) {
    const unitLabel = tempUnitLabel(units.temperature);

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
              <span className="weather-main-card__temp-unit">{unitLabel}</span>
            </p>
          </div>
        </div>
      </section>
    );
  }

  const hourlyTemps: number[] | undefined = data?.hourly?.temperature_2m;
  const dailyMax: number[] | undefined = data?.daily?.temperature_2m_max;
  const dailyTimes: string[] | undefined = data?.daily?.time;

  let rawTempC = 0;
  if (Array.isArray(hourlyTemps) && hourlyTemps.length > 0) {
    rawTempC = hourlyTemps[0];
  } else if (Array.isArray(dailyMax) && dailyMax.length > 0) {
    rawTempC = dailyMax[0];
  }

  const unitLabel = tempUnitLabel(units.temperature);
  const convertedTemp = Math.round(convertTemp(rawTempC, units.temperature));

  let dateLabel = "";
  if (Array.isArray(dailyTimes) && dailyTimes.length > 0) {
    const d = new Date(dailyTimes[0]);
    dateLabel = d.toLocaleDateString(undefined, {
      weekday: "long",
      month: "short",
      day: "numeric",
    });
  }

  return (
    <section
      className="weather-main-card"
      style={{ backgroundImage: `url(${bgImageLRG})` }}
    >
      <div className="weather-main-card__body">
        <div className="weather-main-card__location">
          <p className="weather-main-card__city">Current location</p>
          <p className="weather-main-card__date">{dateLabel}</p>
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
