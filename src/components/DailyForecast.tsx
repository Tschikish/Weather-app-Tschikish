import { convertTemp, tempUnitLabel, type UnitSettings } from "../utils/units";
import { weatherCodeToIcon } from "../utils/weatherIcons";

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
                <img src={weatherCodeToIcon(d.code)} alt="" />
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
