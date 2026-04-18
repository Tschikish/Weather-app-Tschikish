import { useState } from "react";
import { DEFAULT_LOCATION } from "./api/openMeteo";
import DailyForecast from "./components/DailyForecast";
import Header from "./components/Header";
import HourlyForecast from "./components/HourlyForecast";
import Stats from "./components/Stats";
import WeatherMainCard from "./components/WeatherMainCard";
import { useWeatherQuery } from "./hooks/useWeatherQuery";
import type { CityOption } from "./types/location";
import { METRIC_UNIT_SETTINGS, type UnitSettings } from "./utils/units";

const App = () => {
  const [selectedCity, setSelectedCity] = useState<CityOption | null>(null);
  const [unitSettings, setUnitSettings] =
    useState<UnitSettings>(METRIC_UNIT_SETTINGS);

  const activeCity = selectedCity ?? DEFAULT_LOCATION;

  const weatherCoordinates = {
    latitude: activeCity.latitude,
    longitude: activeCity.longitude,
    timezone: activeCity.timezone,
  };

  const { data: weatherData, isPending, error } =
    useWeatherQuery(weatherCoordinates);
  const displayCity = selectedCity ?? (isPending ? null : DEFAULT_LOCATION);

  return (
    <div className="app-root">
      <Header
        onCitySelect={setSelectedCity}
        unitSettings={unitSettings}
        onUnitSettingsChange={setUnitSettings}
      />

      <main className="page-main">
        <div className="content-row">
          <section className="content-main">
            <WeatherMainCard
              data={weatherData}
              units={unitSettings}
              loading={isPending}
              city={displayCity}
            />
            <Stats data={weatherData} units={unitSettings} />
            <DailyForecast data={weatherData} units={unitSettings} />
          </section>

          <aside className="content-sidebar">
            <HourlyForecast data={weatherData} units={unitSettings} />
          </aside>
        </div>

        {error && (
          <p className="page-error">
            {error instanceof Error
              ? error.message
              : "Failed to load weather data."}
          </p>
        )}
      </main>
    </div>
  );
};

export default App;
