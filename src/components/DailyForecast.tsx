import { tempUnitLabel, type UnitSettings } from "../utils/units";
import sunny from "../assets/images/icon-sunny.webp";
import partlyCloudy from "../assets/images/icon-partly-cloudy.webp";
import overcast from "../assets/images/icon-overcast.webp";
import drizzle from "../assets/images/icon-drizzle.webp";
import rain from "../assets/images/icon-rain.webp";
import snow from "../assets/images/icon-snow.webp";
import fog from "../assets/images/icon-fog.webp";
import storm from "../assets/images/icon-storm.webp";

type DailyForecastProps = {
  data: any; // Open-Meteo response
  units: UnitSettings;
};

const weekday = (isoDate: string) =>
  new Date(isoDate).toLocaleDateString(undefined, { weekday: "short" });

const todayISO = () => new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD in local time

const clamp7FromToday = (daily: any) => {
  const times: string[] = daily?.time ?? [];
  const maxs: number[] = daily?.temperature_2m_max ?? [];
  const mins: number[] = daily?.temperature_2m_min ?? [];
  const codes: number[] = daily?.weathercode ?? [];

  if (!times.length) return [];

  const t0 = todayISO();
  const startIdx = Math.max(
    0,
    times.findIndex((d) => d >= t0),
  );
  const idx0 = startIdx === -1 ? 0 : startIdx;

  return times.slice(idx0, idx0 + 7).map((date, i) => {
    const j = idx0 + i;
    return {
      date,
      day: new Date(date).toLocaleDateString(undefined, { weekday: "short" }),
      max: maxs[j],
      min: mins[j],
      code: codes[j],
    };
  });
};

const iconFromCode = (code: number) => {
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

const DailyForecast = ({ data, units }: DailyForecastProps) => {
  const unit = tempUnitLabel(units.temperature);
  const items = clamp7FromToday(data?.daily);

  return (
    <section className="daily-forecast">
      <h2 className="section-title">Daily forecast</h2>

      <div className="daily-forecast__list">
        {items.map((d) => (
          <article className="daily-forecast__item" key={d.date}>
            <p className="daily-forecast__day">{d.day}</p>
            <div className="daily-forecast__icon" aria-hidden="true">
              <img className="" src={iconFromCode(d.code)} alt="" />
            </div>
            <p className="daily-forecast__temps">
              <span>
                {Math.round(d.max)}
                {unit}
              </span>
              <span>
                {Math.round(d.min)}
                {unit}
              </span>
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default DailyForecast;