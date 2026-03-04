import { useState } from "react";

import Header from "./components/Header";
import WeatherMainCard from "./components/WeatherMainCard";
import Stats from "./components/Stats";
import DailyForecast from "./components/DailyForecast";
import HourlyForecast from "./components/HourlyForecast";

import { useWeatherQuery } from "./hooks/useWeatherQuery";
import type { UseWeatherQueryOptions, Units } from "./hooks/useWeatherQuery";
import { Cities } from "./data/cities";

import { METRIC_UNIT_SETTINGS, type UnitSettings } from "./utils/units";

const App = () => {
  const [units, setUnits] = useState<Units>("metric");
  const [unitSettings, setUnitSettings] =
    useState<UnitSettings>(METRIC_UNIT_SETTINGS);
  const [coords, setCoords] = useState<UseWeatherQueryOptions | null>(null);

  const { data: apiData, isLoading, error } = useWeatherQuery(coords);
  const weatherData = apiData ?? null;

  //Delete
  console.log(weatherData);

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
    });
  };

  return (
    <div className="app-root">
      <Header
        onCitySearch={handleCitySearch}
        units={units}
        onUnitsChange={setUnits}
        unitSettings={unitSettings}
        onUnitSettingsChange={setUnitSettings}
      />

      <main className="page-main">
        <div className="content-row">
          <section className="content-main">
            <WeatherMainCard data={weatherData} units={unitSettings} />
            <Stats data={weatherData} units={unitSettings} />
            <DailyForecast data={weatherData} units={unitSettings} />
          </section>

          <aside className="content-sidebar">
            <HourlyForecast data={weatherData} units={unitSettings} />
          </aside>
        </div>

        {isLoading && !weatherData && (
          <p style={{ marginTop: "16px" }}>Loading weather…</p>
        )}
        {error && (
          <p style={{ marginTop: "16px", color: "#f66" }}>
            Failed to load weather data.
          </p>
        )}
      </main>
    </div>
  );
};

export default App;
