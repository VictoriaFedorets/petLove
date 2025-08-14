import css from "./Button.module.css";

export default function Button({
  children,
  type = "button",
  onClick,
  className = "",
  icon = null,
  iconPosition = "right",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
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
