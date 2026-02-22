import Header from "./components/Header";
import WeatherMainCard from "./components/WeatherMainCard";
import Stats from "./components/Stats";
import DailyForecast from "./components/DailyForecast";
import HourlyForecast from "./components/HourlyForecast";

const App = () => {
  return (
    <div className="app-root">
      <Header />

      <main className="page-main">
        {/* MAIN CONTENT + HOURLY SIDEBAR */}
        {/* shared-gap ensures same spacing as search input/button */}
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