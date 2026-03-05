import SearchBar from "./SearchBar";
import UnitsToggle from "./UnitsToggle";
import type { Units } from "../hooks/useWeatherQuery";
import type { UnitSettings } from "../utils/units";
import Logo from "../assets/images/logo.svg";

type HeaderProps = {
  onCitySearch: (city: string) => void;
  units: Units;
  onUnitsChange: (units: Units) => void;
  unitSettings: UnitSettings;
  onUnitSettingsChange: (settings: UnitSettings) => void;
};

const Header = ({
  onCitySearch,
  units,
  onUnitsChange,
  unitSettings,
  onUnitSettingsChange,
}: HeaderProps) => {
  return (
    <header className="header">
      <div className="header-top">
        <div className="logo">
          <img src={Logo} alt="Logo" />
        </div>

        <UnitsToggle
          mode={units}
          onModeChange={onUnitsChange}
          unitSettings={unitSettings}
          onUnitSettingsChange={onUnitSettingsChange}
        />
      </div>

      <div className="header-title">
        <h1>How&apos;s the sky looking today?</h1>
      </div>

      <SearchBar onCitySearch={onCitySearch} />
    </header>
  );
};

export default Header;