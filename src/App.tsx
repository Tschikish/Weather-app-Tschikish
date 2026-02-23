import { useState, useEffect } from "react";

import Header from "./components/Header";
import WeatherMainCard from "./components/WeatherMainCard";
import Stats from "./components/Stats";
import DailyForecast from "./components/DailyForecast";
import HourlyForecast from "./components/HourlyForecast";

import { useWeatherQuery } from "./hooks/useWeatherQuery";
import type { UseWeatherQueryOptions, Units } from "./hooks/useWeatherQuery";
import { Cities } from "./data/Cities";

const App = () => {
  const [units, setUnits] = useState<Units>("metric");

  // coords will drive the weather query
  const [coords, setCoords] = useState<UseWeatherQueryOptions | null>(null);

  // Run weather query whenever coords or units change
  const {
    data: weatherData,
    isLoading,
    error,
  } = useWeatherQuery(coords ? { ...coords, units } : null);

  useEffect(() => {
    setCoords({
      latitude: 52.52,
      longitude: 13.41,
      units: "metric",
    });
  }, []);

  const handleCitySearch = (cityName: string) => {
    const match = Cities.find(
      (c) => c.name.toLowerCase() === cityName.toLowerCase(),
    );

    if (!match) {
      console.warn("City not found in Cities array:", cityName);
      return;
    }

    setCoords({
      latitude: match.lat,
      longitude: match.lng,
      units,
    });
  };

  return (
    <div className="app-root">
      <Header onCitySearch={handleCitySearch} />

      <main className="page-main">
        <div className="content-row shared-gap">
          <section className="content-main">
            <WeatherMainCard />
            <Stats />
            <DailyForecast />
          </section>

          <aside className="content-sidebar">
            <HourlyForecast />
          </aside>
        </div>
      </main>
    </div>
  );
};

export default App;
