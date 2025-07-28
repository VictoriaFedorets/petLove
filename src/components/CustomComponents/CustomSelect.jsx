import Select from "react-select";
import { Controller } from "react-hook-form";

export function CustomSelect({ name, options, placeholder, control }) {
  const formattedOptions = [
    { value: "all", label: "Show all", isAlwaysYellow: true },
    ...options.map((opt) => {
      const val =
        typeof opt === "string" ? opt.toLowerCase() : opt.value.toLowerCase();
      const label =
        typeof opt === "string"
          ? opt.charAt(0).toUpperCase() + opt.slice(1)
          : opt.label.charAt(0).toUpperCase() + opt.label.slice(1);
      return { value: val, label };
    }),
  ];

  const customStyles = {
    container: (provided) => ({ ...provided, width: "100%" }),
    control: (provided) => ({
      ...provided,
      width: "100%",
      border: "none",
      borderRadius: "30px",
      backgroundColor: "#fff",
      paddingLeft: "12px",
      paddingRight: "30px",
      height: "42px",
      minHeight: "unset",
      fontWeight: 500,
      fontSize: "14px",
      lineHeight: "129%",
      letterSpacing: "-0.03em",
      color: "#262626",
      boxShadow: "none",
      position: "relative",
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "15px",
      width: "100%",
      maxHeight: "216px",
      background: "#fff",
      fontWeight: 500,
      fontSize: "14px",
      lineHeight: "129%",
      letterSpacing: "-0.03em",
      marginTop: "4px",
      zIndex: 100,
    }),
    menuList: (provided) => ({
      ...provided,
      padding: "12px",
      display: "flex",
      flexDirection: "column",
      gap: "8px",
    }),
    option: (provided, state) => {
      const baseStyle = {
        ...provided,
        cursor: "pointer",
        backgroundColor: state.isFocused ? "#fff4df" : "#fff",
        color: "#262626",
        padding: "0px",
        borderRadius: "8px",
        transition: "background-color 0.2s ease",
      };

      if (state.data.isAlwaysYellow) {
        return {
          ...baseStyle,
          color: "#f6b83d",
        };
      }

      return baseStyle;
    },
    placeholder: (provided) => ({
      ...provided,
      fontWeight: "500",
      fontSize: "14px",
      lineHeight: "129%",
      letterSpacing: "-0.03em",
      color: "#262626",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#262626",
      fontWeight: 500,
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: 0,
    }),
    indicatorSeparator: () => null,
    dropdownIndicator: (provided) => ({
      ...provided,
      padding: "0",
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      cursor: "pointer",
      pointerEvents: "none",
      color: "#262626",
      width: "18px",
      height: "18px",
    }),
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select
          {...field}
          options={formattedOptions}
          placeholder={placeholder}
          styles={customStyles}
          components={{ ClearIndicator: null }}
          classNamePrefix="react-select"
          isClearable
          value={
            formattedOptions.find((opt) => opt.value === field.value) || null
          }
          onChange={(option) => field.onChange(option?.value || "")}
        />
      )}
    />
  );
}
