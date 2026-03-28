import { FormEvent, useState, useMemo } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { Cities } from "../data/cities";
import SearchIcon from "../assets/images/icon-search.svg";

type SearchBarProps = {
  onCitySearch: (city: string) => void;
};

const SearchBar = ({ onCitySearch }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

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

    return [...beginsWith, ...includes].slice(0, 4);
  }, [debouncedQuery]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    onCitySearch(query);
    setQuery("");
    setHighlightedIndex(-1);
  };

  const handleSelectCity = (name: string) => {
    onCitySearch(name);
    setQuery("");
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!filteredCities.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < filteredCities.length - 1 ? prev + 1 : 0,
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredCities.length - 1,
      );
    }

    if (e.key === "Enter" && highlightedIndex >= 0) {
      e.preventDefault();
      handleSelectCity(filteredCities[highlightedIndex].name);
    }

    if (e.key === "Escape") {
      setHighlightedIndex(-1);
    }
  };

  return (
    <form className="search" onSubmit={handleSubmit}>
      <div className="search-row">
        <div className="search-input-wrapper">
          <span className="search-icon" aria-hidden="true">
            <img src={SearchIcon} alt="" />
          </span>

          <input
            className="search-input"
            type="text"
            placeholder="Search for a place..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setHighlightedIndex(0);
            }}
            onKeyDown={handleKeyDown}
          />

          {filteredCities.length > 0 && (
            <ul className="search-dropdown">
              {filteredCities.map((city, index) => (
                <li
                  key={city.name}
                  onClick={() => handleSelectCity(city.name)}
                  className={`search-dropdown-item ${
                    index === highlightedIndex ? "active" : ""
                  }`}
                >
                  {city.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button className="search-button" type="submit">
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
