import { FormEvent, useState } from "react";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: trigger city search / lat-lon fetch
  };

  return (
    <form className="search" onSubmit={handleSubmit}>
      {/* SAME shared-gap AS MAIN/ASIDE */}
      <div className="search-row shared-gap">
        <div className="search-input-wrapper">
          <span className="search-icon" aria-hidden="true">
            🔍
          </span>
          <input
            className="search-input"
            type="text"
            placeholder="Search for a place..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <button className="search-button" type="submit">
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;