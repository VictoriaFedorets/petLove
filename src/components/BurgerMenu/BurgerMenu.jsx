import { useState } from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/authSelectors";
import clsx from "clsx";
import Nav from "../Nav/Nav";
import AuthNav from "../AuthNav/AuthNav";
import UserNav from "../UserNav/UserNav";
import css from "./BurgerMenu.module.css";

export default function BurgerMenu({ isHomePage }) {
  const [isOpen, setIsOpen] = useState(false);

  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className={css.burgerWrapper}>
      <button className={css.burgerBtn} onClick={toggleMenu}>
        <svg className={clsx(css.burgerIcon, isHomePage && css.burgerIconHome)}>
          <use href="#icon-menu" />
        </svg>
      </button>
      {isOpen && (
        <div>
          <Nav />
          {isLoggedIn ? <UserNav user={user} /> : <AuthNav />}
        </div>
      )}
    </div>
  );
}
