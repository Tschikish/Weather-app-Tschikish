import SearchBar from "./SearchBar";
import UnitsToggle from "./UnitsToggle";

type HeaderProps = {
  onCitySearch: (city: string) => void;
}

const Header = ({onCitySearch} : HeaderProps) => {
  return (
    <header className="header">
      <div className="header-top">
        <div className="logo">
          <span className="logo-icon" aria-hidden="true" />
          <span className="logo-text">Weather Now</span>
        </div>

        <UnitsToggle />
      </div>

      <div className="header-title">
        <h1>How&apos;s the sky looking today?</h1>
      </div>

      <SearchBar onCitySearch = {onCitySearch}/>
    </header>
  );
};

export default Header;