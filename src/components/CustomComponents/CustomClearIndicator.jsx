import { components } from "react-select";

export function CustomClearIndicator(props) {
  return (
    <components.ClearIndicator {...props}>
      <svg
        width="18"
        height="18"
        className="custom-clear-icon" // опційно: стилізація через CSS
        aria-hidden="true"
        focusable="false"
        cursor="pointer"
      >
        <use href="#icon-close" />
      </svg>
    </components.ClearIndicator>
  );
}
