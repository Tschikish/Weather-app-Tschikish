const HourlyForecast = (data:any) => {
  return (
    <section className="hourly-forecast">
      <header className="hourly-forecast__header">
        <h2 className="section-title">Hourly forecast</h2>
        <button
          type="button"
          className="hourly-forecast__day-switch"
          aria-haspopup="listbox"
        >
          <span>Tuesday</span>
          <span aria-hidden="true">▾</span>
        </button>
      </header>

      <ul className="hourly-forecast__list">
        <li className="hourly-forecast__item">
          <div className="hourly-forecast__time">3 PM</div>
          <div className="hourly-forecast__icon" aria-hidden="true">
            ☁️
          </div>
          <div className="hourly-forecast__temp">20°</div>
        </li>

        <li className="hourly-forecast__item">
          <div className="hourly-forecast__time">4 PM</div>
          <div className="hourly-forecast__icon" aria-hidden="true">
            ☁️</div>
          <div className="hourly-forecast__temp">20°</div>
        </li>

        <li className="hourly-forecast__item">
          <div className="hourly-forecast__time">3 PM</div>
          <div className="hourly-forecast__icon" aria-hidden="true">
            ☁️
          </div>
          <div className="hourly-forecast__temp">20°</div>
        </li>

        <li className="hourly-forecast__item">
          <div className="hourly-forecast__time">3 PM</div>
          <div className="hourly-forecast__icon" aria-hidden="true">
            ☁️
          </div>
          <div className="hourly-forecast__temp">20°</div>
        </li>

        <li className="hourly-forecast__item">
          <div className="hourly-forecast__time">3 PM</div>
          <div className="hourly-forecast__icon" aria-hidden="true">
            ☁️
          </div>
          <div className="hourly-forecast__temp">20°</div>
        </li>
      </ul>
    </section>
  );
};

export default HourlyForecast;