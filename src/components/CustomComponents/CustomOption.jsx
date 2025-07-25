export const CustomOption = (props) => {
  const {
    data,
    innerRef,
    innerProps,
    isFocused,
    selectProps: { inputValue },
  } = props;

  const safeInput = inputValue?.trim().toLowerCase() || "";

  const [region, city] = data.label.split(", ").map((s) => s.trim());

  const highlightMatch = (text) => {
    if (!safeInput) return text;

    const regex = new RegExp(`(${safeInput})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, i) =>
      part.toLowerCase() === safeInput ? (
        <strong key={i} style={{ color: "#262626", fontWeight: 500 }}>
          {part}
        </strong>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  return (
    <div
      ref={innerRef}
      {...innerProps}
      style={{
        padding: "4px 0",
        cursor: "pointer",
        // borderRadius: isFocused ? "5px" : "",
        backgroundColor: isFocused ? "#fff4df" : "#fff",
        color: "rgba(38, 38, 38, 0.4)",
        fontWeight: 500,
        fontSize: "14px",
        lineHeight: "129%",
        letterSpacing: "-0.03em",
      }}
    >
      {highlightMatch(region)}, {highlightMatch(city)}
    </div>
  );
};
