import SearchBar from "./SearchBar";
import UnitsToggle from "./UnitsToggle";
import type { Units } from "../hooks/useWeatherQuery";

type HeaderProps = {
  onCitySearch: (city: string) => void;
  units: Units;
  onUnitsChange: (units: Units) => void;
};

const Header = ({ onCitySearch, units, onUnitsChange }: HeaderProps) => {
  return (
    <header className="header">
      <div className="header-top">
        <div className="logo">
          <span className="logo-icon" aria-hidden="true" />
          <span className="logo-text">Weather Now</span>
        </div>

        <UnitsToggle mode={units} onModeChange={onUnitsChange} />
      </div>

      <div className="header-title">
        <h1>How&apos;s the sky looking today?</h1>
      </div>

      <SearchBar onCitySearch={onCitySearch} />
    </header>
  );
};

export default Header;