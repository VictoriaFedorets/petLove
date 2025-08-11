import Select from "react-select";
import { Controller } from "react-hook-form";
import { useMediaQuery } from "../../hooks/useMediaQuery";

export function CustomSelect({
  name,
  options,
  placeholder,
  control,
  controlWidth = "100%",
  containerStyle = {},
}) {
  const { isTablet, getControlWidth } = useMediaQuery();

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
    container: (provided) => ({
      ...provided,
      ...containerStyle,
    }),
    control: (provided) => ({
      ...provided,
      width: controlWidth,
      border: "none",
      borderRadius: "30px",
      backgroundColor: "var(--white)",
      paddingLeft: isTablet ? "14px" : "12px",
      paddingRight: isTablet ? "32px" : "30px",
      height: isTablet ? "48px" : "42px",
      minHeight: "unset",

      letterSpacing: "-0.03em",
      color: "var(--black)",
      boxShadow: "none",
      position: "relative",
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "15px",
      width: "100%",
      maxHeight: getControlWidth("296px", "216px", "190px"),
      background: "var(--white)",
      fontWeight: 500,
      fontSize: isTablet ? "16px" : "14px",
      lineHeight: isTablet ? "125%" : "129%",
      letterSpacing: "-0.03em",
      marginTop: "4px",
      zIndex: 100,
    }),
    menuList: (provided) => ({
      ...provided,
      padding: isTablet ? "14px" : "12px",
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      maxHeight: getControlWidth("296px", "216px", "190px"),
    }),
    option: (provided, state) => {
      const baseStyle = {
        ...provided,
        cursor: "pointer",
        backgroundColor: state.isFocused ? "var(--white)4df" : "var(--white)",
        color: "var(--black)",
        padding: "0px",
        borderRadius: "8px",
        transition: "background-color 0.2s ease",
      };

      if (state.data.isAlwaysYellow) {
        return {
          ...baseStyle,
          color: "var(--yellow)",
        };
      }

      return baseStyle;
    },
    placeholder: (provided) => ({
      ...provided,
      fontWeight: 500,
      fontSize: isTablet ? "16px" : "14px",
      lineHeight: isTablet ? "125%" : "129%",
      letterSpacing: "-0.03em",
      color: "var(--black)",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "var(--black)",
      fontWeight: 500,
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: 0,
    }),
    indicatorSeparator: () => null,
    dropdownIndicator: (provided, state) => ({
      ...provided,
      padding: "0",
      position: "absolute",
      top: "50%",
      cursor: "pointer",
      color: "var(--black)",
      width: "18px",
      height: "18px",
      transition: "transform 0.3s ease",
      transform: state.selectProps.menuIsOpen
        ? "translateY(-50%) rotate(180deg)"
        : "translateY(-50%) rotate(0deg)",
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
