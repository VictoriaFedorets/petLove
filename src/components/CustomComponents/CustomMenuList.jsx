import { components } from "react-select";

export const CustomMenuList = (props) => {
  return (
    <components.MenuList {...props}>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {props.children}
      </div>
    </components.MenuList>
  );
};
