import { useEffect, useId, useMemo, useRef, useState } from "react";
import type {
  FormEvent,
  KeyboardEvent,
  MouseEvent as ReactMouseEvent,
} from "react";
import SearchIcon from "../assets/images/icon-search.svg";
import { useCitySearch } from "../hooks/useCitySearch";
import { useDebounce } from "../hooks/useDebounce";
import type { CityOption } from "../types/location";
import { formatLocationMeta } from "../utils/location";

type SearchBarProps = {
  onCitySelect: (city: CityOption) => void;
};

const MIN_SEARCH_LENGTH = 2;

const SearchBar = ({ onCitySelect }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const inputId = useId();
  const listboxId = `${inputId}-listbox`;

  const debouncedQuery = useDebounce(query, 250);
  const normalizedQuery = debouncedQuery.trim();
  const trimmedQuery = query.trim();

  const { data: cities = [], isFetching, error } = useCitySearch(normalizedQuery);

  const hasMinimumQuery = trimmedQuery.length >= MIN_SEARCH_LENGTH;
  const isWaitingForDebounce =
    hasMinimumQuery && trimmedQuery !== normalizedQuery;
  const results = useMemo(
    () => (isWaitingForDebounce ? [] : cities),
    [cities, isWaitingForDebounce],
  );
  const resolvedHighlightedIndex =
    results.length === 0
      ? -1
      : highlightedIndex >= 0 && highlightedIndex < results.length
        ? highlightedIndex
        : 0;
  const showDropdown = isOpen && hasMinimumQuery;
  const activeDescendant =
    resolvedHighlightedIndex >= 0 && results[resolvedHighlightedIndex]
      ? `${listboxId}-${results[resolvedHighlightedIndex].id}`
      : undefined;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectCity = (city: CityOption) => {
    onCitySelect(city);
    setQuery("");
    setHighlightedIndex(-1);
    setIsOpen(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const selectedCity = results[resolvedHighlightedIndex] ?? results[0];

    if (!selectedCity) {
      return;
    }

    handleSelectCity(selectedCity);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown || !results.length) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlightedIndex((currentValue) =>
        currentValue < results.length - 1 ? currentValue + 1 : 0,
      );
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlightedIndex((currentValue) =>
        currentValue > 0 ? currentValue - 1 : results.length - 1,
      );
    }

    if (event.key === "Enter" && resolvedHighlightedIndex >= 0) {
      event.preventDefault();
      handleSelectCity(results[resolvedHighlightedIndex]);
    }

    if (event.key === "Escape") {
      setHighlightedIndex(-1);
      setIsOpen(false);
    }
  };

  const preventInputBlur = (
    event: ReactMouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
  };

  const renderDropdownContent = () => {
    if (isWaitingForDebounce || isFetching) {
      return (
        <li className="search-dropdown__status" role="status">
          Searching cities...
        </li>
      );
    }

    if (error) {
      return (
        <li className="search-dropdown__status search-dropdown__status--error">
          Couldn&apos;t load city matches. Try again.
        </li>
      );
    }

    if (!results.length && normalizedQuery.length >= MIN_SEARCH_LENGTH) {
      return (
        <li className="search-dropdown__status">
          No cities found for &quot;{normalizedQuery}&quot;.
        </li>
      );
    }

    return results.map((city, index) => {
      const optionId = `${listboxId}-${city.id}`;
      const isActive = index === resolvedHighlightedIndex;

      return (
        <li
          key={optionId}
          role="option"
          id={optionId}
          aria-selected={isActive}
        >
          <button
            type="button"
            className={`search-dropdown-item ${isActive ? "active" : ""}`}
            onMouseDown={preventInputBlur}
            onClick={() => handleSelectCity(city)}
          >
            <span className="search-dropdown-item__name">{city.name}</span>
            <span className="search-dropdown-item__meta">
              {formatLocationMeta(city)}
            </span>
          </button>
        </li>
      );
    });
  };

  return (
    <form className="search" onSubmit={handleSubmit}>
      <div className="search-row">
        <div className="search-input-wrapper" ref={wrapperRef}>
          <span className="search-icon" aria-hidden="true">
            <img src={SearchIcon} alt="" />
          </span>

          <input
            id={inputId}
            className="search-input"
            type="text"
            placeholder="Search for a city or postal code..."
            value={query}
            autoComplete="off"
            aria-autocomplete="list"
            aria-controls={showDropdown ? listboxId : undefined}
            aria-activedescendant={activeDescendant}
            aria-expanded={showDropdown}
            onChange={(event) => {
              setQuery(event.target.value);
              setHighlightedIndex(-1);
              setIsOpen(event.target.value.trim().length >= MIN_SEARCH_LENGTH);
            }}
            onFocus={() => {
              if (hasMinimumQuery) {
                setIsOpen(true);
              }
            }}
            onKeyDown={handleKeyDown}
          />

          {showDropdown && (
            <ul className="search-dropdown" id={listboxId} role="listbox">
              {renderDropdownContent()}
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