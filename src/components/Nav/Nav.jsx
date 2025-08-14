import css from "./Nav.module.css";
import clsx from "clsx";
import { NavLink } from "react-router-dom";

export default function Nav({ isHomePage }) {
  const getCombinedClass = ({ isActive }) =>
    clsx(
      css.link,
      isHomePage ? css.linkHome : "",
      isActive && (isHomePage ? css.activeHome : css.active)
    );

  return (
    <nav className={css.headerNav}>
      <NavLink to="/news" className={getCombinedClass}>
        News
      </NavLink>
      <NavLink to="/notices" className={getCombinedClass}>
        Find pet
      </NavLink>
      <NavLink to="/friends" className={getCombinedClass}>
        Our friends
      </NavLink>
    </nav>
  );
}
