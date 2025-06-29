import css from "./Title.module.css";

export default function Title({ children, className = "" }) {
  return <h1 className={`${css.title} ${className}`}>{children}</h1>;
}
