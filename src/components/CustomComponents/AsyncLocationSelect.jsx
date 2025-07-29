import AsyncSelect from "react-select/async";
import { CustomClearIndicator } from "./CustomClearIndicator";
import { CustomMenuList } from "./CustomMenuList";
import { CustomOption } from "./CustomOption";
import { SearchIcon } from "./SearchIcon";
import { useMediaQuery } from "../../hooks/useMediaQuery";

export function AsyncLocationSelect({
  loadOptions,
  onChange,
  value,
  placeholder = "Location",
  className,
}) {
  const { isTablet } = useMediaQuery();

  return (
    <AsyncSelect
      cacheOptions
      defaultOptions={false}
      loadOptions={loadOptions}
      onChange={(option) => onChange(option?.value || "")}
      placeholder="Location"
      classNamePrefix="react-select"
      noOptionsMessage={({ inputValue }) =>
        inputValue.length < 3 ? null : "No cities found"
      }
      components={{
        ClearIndicator: CustomClearIndicator,
        DropdownIndicator: SearchIcon,
        IndicatorSeparator: () => null,
        MenuList: CustomMenuList,
        Option: CustomOption,
      }}
      isClearable
      styles={{
        control: (provided) => ({
          ...provided,
          width: isTablet ? "227px" : "100%",
          border: "none",
          borderRadius: "30px",
          backgroundColor: "#fff",
          paddingLeft: isTablet ? "14px" : "12px",
          paddingRight: isTablet ? "55px" : "52px",
          height: "42px",
          minHeight: "unset",
          fontFamily: "var(--font-family)",
          fontWeight: 500,
          fontSize: isTablet ? "16px" : "14px",
          lineHeight: isTablet ? "125%" : "129%",
          letterSpacing: "-0.03em",
          color: "#262626",
          boxShadow: "none",
        }),
        input: (provided) => ({
          ...provided,
          margin: 0,
          padding: 0,
          color: "#262626",
        }),
        placeholder: (provided) => ({
          ...provided,
          color: "#262626",
        }),
        singleValue: (provided) => ({
          ...provided,
          color: "#262626",
          fontWeight: 500,
        }),
        menu: (provided) => ({
          ...provided,
          borderRadius: "15px",
          width: "100%",
          maxHeight: isTablet ? "104px" : "94px",
          background: "#fff",
          zIndex: 100,
          marginTop: "4px",
        }),
        menuList: (provided) => ({
          ...provided,
          borderRadius: "15px",
          padding: isTablet ? "14px" : "12px",
          width: "100%",
          maxHeight: isTablet ? "104px" : "94px",
          zIndex: 100,
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
        valueContainer: (provided) => ({
          ...provided,
          padding: "0",
        }),
        clearIndicator: (provided) => ({
          ...provided,
          padding: "0",
          color: "#262626",
        }),
      }}
    />
  );
}
