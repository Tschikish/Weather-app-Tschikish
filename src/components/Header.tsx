import Logo from "../assets/images/logo.svg";
import type { CityOption } from "../types/location";
import type { UnitSettings } from "../utils/units";
import SearchBar from "./SearchBar";
import UnitsToggle from "./UnitsToggle";

type HeaderProps = {
  onCitySelect: (city: CityOption) => void;
  unitSettings: UnitSettings;
  onUnitSettingsChange: (settings: UnitSettings) => void;
};

const Header = ({
  onCitySelect,
  unitSettings,
  onUnitSettingsChange,
}: HeaderProps) => {
  return (
    <header className="header">
      <div className="header-top">
        <div className="logo">
          <img src={Logo} alt="SkyCast logo" />
        </div>

        <UnitsToggle
          unitSettings={unitSettings}
          onUnitSettingsChange={onUnitSettingsChange}
        />
      </div>

      <div className="header-title">
        <h1>How&apos;s the sky looking today?</h1>
      </div>

      <SearchBar onCitySelect={onCitySelect} />
    </header>
  );
};

export default Header;