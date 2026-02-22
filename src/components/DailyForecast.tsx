const DailyForecast = () => {
  return (
    <section className="daily-forecast">
      <h2 className="section-title">Daily forecast</h2>

      <div className="daily-forecast__list">
        {/* Each day card */}
        <article className="daily-forecast__item">
          <p className="daily-forecast__day">Tue</p>
          <div className="daily-forecast__icon" aria-hidden="true">
            🌧️
          </div>
          <p className="daily-forecast__temps">
            <span>20°</span>
            <span>14°</span>
          </p>
        </article>

        {/* Duplicate these items for now – we’ll map from data later */}
        <article className="daily-forecast__item">
          <p className="daily-forecast__day">Wed</p>
          <div className="daily-forecast__icon" aria-hidden="true">
            🌧️
          </div>
          <p className="daily-forecast__temps">
            <span>21°</span>
            <span>15°</span>
          </p>
        </article>
      </div>
    </section>
  );
};

export default DailyForecast;