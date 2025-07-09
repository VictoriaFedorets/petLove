import { useEffect, useState, useMemo } from "react";
import { useFormikContext } from "formik";
import debounce from "lodash.debounce";
import css from "./SearchField.module.css";

export default function SearchField({ name, placeholder = "Search", icon }) {
  const { setFieldValue, values } = useFormikContext();
  const [localValue, setLocalValue] = useState(values[name] || "");

  // Дебаунс для оновлення Formik тільки через 2 секунди
  const debouncedSetFormikValue = useMemo(
    () =>
      debounce((value) => {
        setFieldValue(name, value);
      }, 2000),
    [setFieldValue, name]
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setLocalValue(value); // локальне оновлення поля
    debouncedSetFormikValue(value); // затримка перед оновленням Formik
  };

  const handleClear = () => {
    setLocalValue("");
    debouncedSetFormikValue.cancel(); // скасування затриманого оновлення
    setFieldValue(name, ""); // одразу очищаємо у Formik
  };

  useEffect(() => {
    return () => {
      debouncedSetFormikValue.cancel(); // очищення debounce при unmount
    };
  }, [debouncedSetFormikValue]);

  return (
    <div className={css.searchWrapper}>
      <input
        className={css.inputSearch}
        type="text"
        placeholder={placeholder}
        value={localValue}
        onChange={handleChange}
      />

      {localValue ? (
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
          <use href={`#icon-${icon}`} />
        </svg>
      </button>
    </div>
  );
}
