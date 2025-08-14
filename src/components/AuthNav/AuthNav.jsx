import css from "./AuthNav.module.css";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

export default function AuthNav({ isHomePage, showAuthNav = true }) {
  return (
    showAuthNav && (
      <div className={css.linkWrapper}>
        <NavLink
          className={clsx(css.loginBtn, isHomePage && css.loginBtnHome)}
          to="/login"
        >
          Log in
        </NavLink>
        <NavLink className={css.registerBtn} to="/register">
          Registration
        </NavLink>
      </div>
    )
  );
}
