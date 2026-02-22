import SearchBar from "./SearchBar";
import UnitsToggle from "./UnitsToggle";

const Header = () => {
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

      <SearchBar />
    </header>
  );
};

export default Header;