import { useState, useEffect } from "react";

import Header from "./components/Header";
import WeatherMainCard from "./components/WeatherMainCard";
import Stats from "./components/Stats";
import DailyForecast from "./components/DailyForecast";
import HourlyForecast from "./components/HourlyForecast";

import { useWeatherQuery } from "./hooks/useWeatherQuery";
import type { UseWeatherQueryOptions, Units } from "./hooks/useWeatherQuery";
import { Cities } from "./data/cities";

const App = () => {
  const [units, setUnits] = useState<Units>("metric");
  const [coords, setCoords] = useState<UseWeatherQueryOptions | null>(null);

  const {
    data: apiData,
    isLoading,
    error,
  } = useWeatherQuery(coords ? { ...coords, units } : null);
  let weatherData = apiData;
  console.log(weatherData?.longitude);
  // useEffect(() => {
  //   setCoords({
  //     latitude: 52.52,
  //     longitude: 13.41,
  //     units: "metric",
  //   });
  // }, []);

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
            <WeatherMainCard data={weatherData} />
            <Stats data={weatherData} />
            <DailyForecast data={weatherData} />
          </section>

          <aside className="content-sidebar">
            <HourlyForecast data={weatherData} />
          </aside>
        </div>
      </main>
    </div>
  );
};

export default App;
