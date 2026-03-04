import { FormEvent, useState, useMemo } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { Cities } from "../data/cities";

type SearchBarProps = {
  onCitySearch: (city: string) => void;
};

const SearchBar = ({ onCitySearch }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 100);

  const filteredCities = useMemo(() => {
    if (!debouncedQuery.trim()) return [];

    const lower = debouncedQuery.toLowerCase();

    const beginsWith = Cities.filter((c) =>
      c.name.toLowerCase().startsWith(lower),
    );

    const includes = Cities.filter(
      (c) =>
        c.name.toLowerCase().includes(lower) &&
        !c.name.toLowerCase().startsWith(lower),
    );

    return [...beginsWith, ...includes].slice(0, 8);
  }, [debouncedQuery]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    onCitySearch(query);
    setQuery("");
  };

  const handleSelectCity = (name: string) => {
    onCitySearch(name);
    setQuery("");
  };

  return (
    <form className="search" onSubmit={handleSubmit}>
      <div className="search-row shared-gap">
        <div className="search-input-flex-wrapper">
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

            {filteredCities.length > 0 && (
              <ul className="search-dropdown">
                {filteredCities.map((city) => (
                  <li
                    key={city.name}
                    onClick={() => handleSelectCity(city.name)}
                    className="search-dropdown-item"
                  >
                    {city.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="search-button-flex-wrapper">
          <button className="search-button" type="submit">
            Search
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
