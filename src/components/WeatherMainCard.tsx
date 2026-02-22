const WeatherMainCard = () => {
  return (
    <section className="weather-main-card">
      <div className="weather-main-card__body">
        <div className="weather-main-card__location">
          <p className="weather-main-card__city">City, Country</p>
          <p className="weather-main-card__date">Tuesday, Aug 5, 2025</p>
        </div>

        <div className="weather-main-card__summary">
          <div className="weather-main-card__icon" aria-hidden="true">
            ☀️
          </div>
          <p className="weather-main-card__temp">
            <span className="weather-main-card__temp-value">20</span>
            <span className="weather-main-card__temp-unit">°</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default WeatherMainCard;