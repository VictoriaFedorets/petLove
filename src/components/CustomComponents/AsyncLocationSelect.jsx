import AsyncSelect from "react-select/async";
import { CustomClearIndicator } from "./CustomClearIndicator";
import { CustomMenuList } from "./CustomMenuList";
import { CustomOption } from "./CustomOption";
import { SearchIcon } from "./SearchIcon";

export function AsyncLocationSelect({
  loadOptions,
  onChange,
  value,
  placeholder = "Location",
  className,
}) {
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
          border: "none",
          borderRadius: "30px",
          backgroundColor: "#fff",
          paddingLeft: "12px",
          paddingRight: "30px",
          height: "42px",
          minHeight: "unset",
          fontFamily: "var(--font-family)",
          fontWeight: 500,
          fontSize: "14px",
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
          fontWeight: 500,
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
          maxHeight: "94px",
          background: "#fff",
          zIndex: 100,
        }),
        menuList: (provided) => ({
          ...provided,
          borderRadius: "15px",
          padding: "12px",
          width: "100%",
          maxHeight: "94px",
          zIndex: 100,
        }),
        valueContainer: (provided) => ({
          ...provided,
          padding: "0",
        }),
        clearIndicator: (provided) => ({
          ...provided,
          padding: "0",
          color: "#262626",
        }),
        dropdownIndicator: (provided) => ({
          ...provided,
          padding: "4px",
        }),
      }}
    />
  );
}
