import { useEffect, useState, useMemo } from "react";
import debounce from "lodash.debounce";
import css from "./SearchField.module.css";

export default function SearchField({
  name,
  placeholder = "Search",
  icon = "search",
  register,
  onSearch,
}) {
  const [localValue, setLocalValue] = useState("");

  // Debounced callback для передачі значення у useForm
  const debouncedUpdate = useMemo(
    () =>
      debounce((value) => {
        const syntheticEvent = { target: { name, value } };
        if (register) {
          register(name).onChange(syntheticEvent); // для react-hook-form
        }
        if (onSearch) {
          onSearch(value); // вызываем колбек поиска из пропсов
        }
      }, 500),
    [name, register, onSearch]
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setLocalValue(value);
    debouncedUpdate(value);
  };

  const handleClear = () => {
    setLocalValue("");
    debouncedUpdate.cancel(); // скасовуємо відкладене оновлення
    const syntheticEvent = { target: { name, value: "" } };
    if (register) {
      register(name).onChange(syntheticEvent);
    }
    if (onSearch) {
      onSearch("");
    }
  };

  useEffect(() => {
    return () => {
      debouncedUpdate.cancel(); // скасовує debounce при розмонтуванні
    };
  }, [debouncedUpdate]);

  return (
    <div className={css.searchWrapper}>
      <input
        type="text"
        className={css.inputSearch}
        placeholder={placeholder}
        value={localValue}
        onChange={handleChange}
      />

      {localValue && (
        <button
          type="button"
          className={css.clearBtn}
          onClick={handleClear}
          aria-label="Clear"
        >
          <svg className={css.clearIcon}>
            <use href="#icon-close" />
          </svg>
        </button>
      )}

      <button type="submit" className={css.searchBtn} aria-label="Search">
        <svg className={css.searchIcon}>
          <use href={`#icon-${icon}`} />
        </svg>
      </button>
    </div>
  );
}
