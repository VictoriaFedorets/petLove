import css from "./BurgerMenu.module.css";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectUser } from "../../redux/user/userSelectors";
import clsx from "clsx";
import Nav from "../Nav/Nav";
import AuthNav from "../AuthNav/AuthNav";
import UserNav from "../UserNav/UserNav";
import useWindowWidth from "../../hooks/useWindowWidth";

export default function BurgerMenu({ isHomePage, showLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const backdropRef = useRef(null);

  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const width = useWindowWidth();
  const isMobile = width < 768;
  const isTablet = width < 1280;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeMenu();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Закриття по backdrop
  const handleBackdropClick = (e) => {
    if (e.target === backdropRef.current) {
      closeMenu();
    }
  };

  const handleMenuClick = (e) => {
    const tag = e.target.tagName.toLowerCase();

    // Якщо клік по кнопці, svg, use, або посиланню — закриваємо меню
    if (["button", "a", "svg", "use"].includes(tag)) {
      closeMenu();
    }
  };

  return (
    <div className={css.burgerWrapper}>
      <button
        className={clsx(css.burgerBtn, isOpen && css.hidden)}
        onClick={toggleMenu}
      >
        <svg className={clsx(css.burgerIcon, isHomePage && css.burgerIconHome)}>
          <use href="#icon-menu" />
        </svg>
      </button>

      <div
        ref={backdropRef}
        className={clsx(css.backdrop, isOpen && css.backdropOpen)}
        onClick={handleBackdropClick}
      >
        <div
          className={clsx(
            css.menuContent,
            isOpen ? css.menuOpen : css.menuClosed,
            isHomePage && css.menuContentHome
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <button className={css.closeBtn} onClick={closeMenu}>
            <svg
              className={clsx(css.closeIcon, isHomePage && css.closeIconHome)}
            >
              <use href="#icon-close" />
            </svg>
          </button>
          <Nav isHomePage={isHomePage} />
          {isLoggedIn ? (
            <UserNav
              isHomePage={isHomePage}
              showLogout={showLogout}
              user={user}
              onAction={closeMenu}
            />
          ) : (
            <AuthNav />
          )}
        </div>
      </div>
    </div>
  );
}
