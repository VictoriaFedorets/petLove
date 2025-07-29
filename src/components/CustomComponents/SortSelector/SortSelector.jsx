import { useController } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setNoticesPage } from "../../../redux/notices/noticesSlice";
import css from "./SortSelector.module.css";

const options = [
  { label: "Popular", value: "byPopularity_true" },
  { label: "Unpopular", value: "byPopularity_false" },
  { label: "Cheap", value: "byPrice_true" },
  { label: "Expensive", value: "byPrice_false" },
];

export const SortSelector = ({ control, name }) => {
  const {
    field: { value, onChange },
  } = useController({ name, control });

  const dispatch = useDispatch();

  const handleSelect = (val) => {
    onChange(val);
    dispatch(setNoticesPage(1));
  };

  const handleClear = () => {
    onChange("");
    dispatch(setNoticesPage(1));
  };

  return (
    <div className={css.radioGroup}>
      {options.map((opt) => (
        <div
          key={opt.value}
          className={css.radioWrapper}
          data-selected={value === opt.value}
        >
          <button
            type="button"
            className={css.radioBtn}
            onClick={() => handleSelect(opt.value)}
          >
            {opt.label}
          </button>

          {value === opt.value && (
            <button
              type="button"
              className={css.clearBtn}
              onClick={handleClear}
              aria-label="Clear selection"
            >
              ✕
            </button>
          )}
        </div>
      ))}
    </div>
  );
};
