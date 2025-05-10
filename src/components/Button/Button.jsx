import css from "./Button.module.css";

export default function Button({
  children,
  type = "button",
  onClick,
  className = "",
  // disabled = false,
  icon = null, // назва іконки в спрайті, наприклад: "icon-plus"
  iconPosition = "right",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      // disabled={disabled}
      className={`${css.button} ${className}`}
    >
      {children}
      {icon && iconPosition === "right" && (
        <svg className={css.icon}>
          <use href={`/icons/sprite.svg#${icon}`} />
        </svg>
      )}
    </button>
  );
}
