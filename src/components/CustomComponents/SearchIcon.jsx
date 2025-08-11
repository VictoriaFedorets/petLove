import { components } from "react-select";

export const SearchIcon = (props) => (
  <components.DropdownIndicator {...props}>
    <svg
      style={{
        position: "absolute",
        right: "12px",
        top: "50%",
        transform: "translateY(-50%)",
        cursor: "pointer",
        pointerEvents: "none",
        color: "var(--black)",
        width: "18px",
        height: "18px",
      }}
    >
      <use href="#icon-search" />
    </svg>
  </components.DropdownIndicator>
);
