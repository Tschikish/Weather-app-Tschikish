const Stats = () => {
  return (
    <section className="weather-stats-row">
      <div className="weather-stat-card">
        <p className="weather-stat-card__label">Feels Like</p>
        <p className="weather-stat-card__value">18°</p>
      </div>

      <div className="weather-stat-card">
        <p className="weather-stat-card__label">Humidity</p>
        <p className="weather-stat-card__value">46%</p>
      </div>

      <div className="weather-stat-card">
        <p className="weather-stat-card__label">Wind</p>
        <p className="weather-stat-card__value">14 km/h</p>
      </div>

      <div className="weather-stat-card">
        <p className="weather-stat-card__label">Precipitation</p>
        <p className="weather-stat-card__value">0 mm</p>
      </div>
    </section>
  );
};

export default Stats;