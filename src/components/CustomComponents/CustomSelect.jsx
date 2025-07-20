import Select from "react-select";
import { useField, useFormikContext } from "formik";

export default function CustomSelect({ name, options, placeholder }) {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(name);

  const formattedOptions = [
    { value: "all", label: "Show all", isAlwaysYellow: true },
    ...options.map((value) => ({
      value,
      label: value,
    })),
  ];

  const customStyles = {
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
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "15px",
      width: "295px",
      height: "216px",
      background: "#fff",
      fontWeight: 500,
      fontSize: "14px",
      lineHeight: "129%",
      letterSpacing: "-0.03em",
      //   color: "rgba(38, 38, 38, 0.6)",
      zIndex: 100,
    }),
    placeholder: (provided) => ({
      ...provided,
      fontWeight: "500",
      fontSize: "14px",
      lineHeight: "129%",
      letterSpacing: "-0.03em",
      color: "#262626",
    }),

    menuList: (provided) => ({
      ...provided,
      padding: "12px",
    }),
    option: (provided, state) => {
      const baseStyle = {
        ...provided,
        cursor: "pointer",
        backgroundColor: state.isFocused ? "#fff4df" : "#fff",
        color: "#262626",
      };

      if (state.data.isAlwaysYellow) {
        return {
          ...baseStyle,
          color: "#f6b83d",
        };
      }

      return baseStyle;
    },
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
      padding: "4px",
    }),
  };

  return (
    <Select
      name={name}
      options={formattedOptions}
      placeholder={placeholder}
      styles={customStyles}
      value={formattedOptions.find((opt) => opt.value === field.value)}
      onChange={(option) => setFieldValue(name, option?.value || "")}
      isClearable
      classNamePrefix="react-select"
    />
  );
}
