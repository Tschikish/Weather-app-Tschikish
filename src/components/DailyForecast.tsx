import { convertTemp, tempUnitLabel, type UnitSettings } from "../utils/units";
import sunny from "../assets/images/icon-sunny.webp";
import partlyCloudy from "../assets/images/icon-partly-cloudy.webp";
import overcast from "../assets/images/icon-overcast.webp";
import drizzle from "../assets/images/icon-drizzle.webp";
import rain from "../assets/images/icon-rain.webp";
import snow from "../assets/images/icon-snow.webp";
import fog from "../assets/images/icon-fog.webp";
import storm from "../assets/images/icon-storm.webp";

type DailyForecastProps = {
  data: any;
  units: UnitSettings;
};

const todayISO = () => new Date().toLocaleDateString("en-CA");

const clamp7FromToday = (daily: any) => {
  const times: string[] = daily?.time ?? [];
  const maxs: Array<number | null> = daily?.temperature_2m_max ?? [];
  const mins: Array<number | null> = daily?.temperature_2m_min ?? [];
  const codes: Array<number | null> = daily?.weathercode ?? [];

  const baseDate = new Date();
  const t0 = todayISO();

  let idx0 = 0;
  if (times.length) {
    const startIdx = times.findIndex((d) => d >= t0);
    idx0 = startIdx === -1 ? 0 : startIdx;
  }

  return Array.from({ length: 7 }, (_, i) => {
    const fallbackDate = new Date(baseDate);
    fallbackDate.setDate(baseDate.getDate() + i);

    const date = times[idx0 + i] ?? fallbackDate.toLocaleDateString("en-CA");

    return {
      date,
      day: new Date(date).toLocaleDateString(undefined, { weekday: "short" }),
      max: maxs[idx0 + i] ?? null,
      min: mins[idx0 + i] ?? null,
      code: codes[idx0 + i] ?? null,
    };
  });
};

const iconFromCode = (code: number | null | undefined) => {
  if (code === 0) return sunny;
  if ([1, 2].includes(code ?? -1)) return partlyCloudy;
  if (code === 3) return overcast;
  if ([45, 48].includes(code ?? -1)) return fog;
  if ([51, 53, 55].includes(code ?? -1)) return drizzle;
  if ([61, 63, 65, 80, 81, 82].includes(code ?? -1)) return rain;
  if ([71, 73, 75, 85, 86].includes(code ?? -1)) return snow;
  if ([95, 96, 99].includes(code ?? -1)) return storm;

  return sunny;
};

const DailyForecast = ({ data, units }: DailyForecastProps) => {
  const unit = tempUnitLabel(units.temperature);
  const items = clamp7FromToday(data?.daily);

  return (
    <section className="daily-forecast">
      <h2 className="section-title">Daily forecast</h2>

      <div className="daily-forecast__list">
        {items.map((d) => {
          const max =
            typeof d.max === "number"
              ? convertTemp(d.max, units.temperature)
              : null;

          const min =
            typeof d.min === "number"
              ? convertTemp(d.min, units.temperature)
              : null;

          return (
            <article className="daily-forecast__item" key={d.date}>
              <p className="daily-forecast__day">{d.day}</p>

              <div className="daily-forecast__icon" aria-hidden="true">
                <img src={iconFromCode(d.code)} alt="" />
              </div>

              <p className="daily-forecast__temps">
                <span>
                  {max !== null ? Math.round(max) : "--"}
                  {max !== null ? unit : ""}
                </span>
                <span>
                  {min !== null ? Math.round(min) : "--"}
                  {min !== null ? unit : ""}
                </span>
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default DailyForecast;
