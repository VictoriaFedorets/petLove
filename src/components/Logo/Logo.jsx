import css from "./Logo.module.css";
import clsx from "clsx";
import { NavLink } from "react-router-dom";

export default function Logo({ isHomePage }) {
  return (
    <NavLink className={clsx(css.logo, isHomePage && css.logoHome)} to="/home">
      petl
      <svg className={clsx(css.heartIcon, isHomePage && css.heartIconHome)}>
        <use href="#icon-heart" />
      </svg>
      ve
    </NavLink>
  );
}
