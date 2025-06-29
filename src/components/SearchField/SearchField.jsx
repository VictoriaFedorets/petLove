import { useState } from "react";
import css from "./SearchField.module.css";

export default function SearchField({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <form className={css.searchWrapper} onSubmit={handleSubmit}>
      <input
        className={css.inputSearch}
        type="text"
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {query ? (
        <button
          type="button"
          className={css.clearBtn}
          onClick={handleClear}
          aria-label="Clear"
        >
          <svg className={css.clearIcon}>
            <use href="#icon-close"></use>
          </svg>
        </button>
      ) : null}

      <button type="submit" className={css.searchBtn} aria-label="Search">
        <svg className={css.searchIcon}>
          <use href="#icon-search" />
        </svg>
      </button>
    </form>
  );
}
