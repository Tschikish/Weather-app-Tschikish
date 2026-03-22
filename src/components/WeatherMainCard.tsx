import bgImageLRG from "../assets/images/bg-today-large.svg";
import { convertTemp, tempUnitLabel, type UnitSettings } from "../utils/units";
import type { CityData } from "../App";
import sunny from "../assets/images/icon-sunny.webp";
import partlyCloudy from "../assets/images/icon-partly-cloudy.webp";
import overcast from "../assets/images/icon-overcast.webp";
import drizzle from "../assets/images/icon-drizzle.webp";
import rain from "../assets/images/icon-rain.webp";
import snow from "../assets/images/icon-snow.webp";
import fog from "../assets/images/icon-fog.webp";
import storm from "../assets/images/icon-storm.webp";

type WeatherMainCardProps = {
  data: any;
  units: UnitSettings;
  loading: boolean;
  city: CityData | null;
};

const iconFromCode = (code: number | null | undefined) => {
  if (typeof code !== "number") return sunny;

  if (code === 0) return sunny;
  if ([1, 2].includes(code)) return partlyCloudy;
  if (code === 3) return overcast;
  if ([45, 48].includes(code)) return fog;
  if ([51, 53, 55].includes(code)) return drizzle;
  if ([61, 63, 65, 80, 81, 82].includes(code)) return rain;
  if ([71, 73, 75, 85, 86].includes(code)) return snow;
  if ([95, 96, 99].includes(code)) return storm;

  return sunny;
};

const WeatherMainCard = ({
  data,
  units,
  loading,
  city,
}: WeatherMainCardProps) => {
  console.log(data);

  if (loading) {
    return (
      <section
        className="weather-main-card"
        // style={{ backgroundImage: `url(${bgImageLRG})` }}
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
  const iconCode: number | undefined = data?.daily?.weathercode[0];

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
          <p
            key={city?.name}
            className="weather-main-card__city weather-main-card__city--enter"
          >
            {city ? city.name + ", " : "Select a city"}
            {city ? city.country : ""}
          </p>
          <p className="weather-main-card__date weather-main-card__date--enter">
            {dateLabel}
          </p>
        </div>

        <div className="weather-main-card__summary">
          <div className="weather-main-card__icon" aria-hidden="true">
            <img src={iconFromCode(iconCode)} alt="" />
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
