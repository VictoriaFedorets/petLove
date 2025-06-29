import { useLocation } from "react-router-dom";
import Logo from "../Logo/Logo.jsx";
import Nav from "../Nav/Nav.jsx";
import AuthNav from "../AuthNav/AuthNav.jsx";
import UserNav from "../UserNav/UserNav.jsx";
import BurgerMenu from "../BurgerMenu/BurgerMenu.jsx";
import useWindowWidth from "../../hooks/useWindowWidth.js";
import css from "./Header.module.css";

import { useSelector } from "react-redux";
import {
  selectIsLoggedIn,
  selectUser,
} from "../../redux/user/userSelectors.js";

const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  const location = useLocation();
  const isHomePage = location.pathname === "/home";

  const width = useWindowWidth();
  const isMobile = width < 768;
  const isTablet = width < 1280;
  // const getNavLinkClass = ({ isActive }) =>
  //   clsx(css.link, isActive && css.active);

  return (
    <header
      className={`${css.headerContainer} ${isHomePage ? css.homeHeader : ""}`}
    >
      <Logo
        isHomePage={isHomePage}
        //   isAuthenticated={isLoggedIn}
      />

      <div className={css.headerNav}>
        <Nav isHomePage={isHomePage} />
      </div>
      <div className={css.navWrapper}>
        {isLoggedIn ? (
          <UserNav
            isHomePage={isHomePage}
            showLogout={!(isMobile || (isTablet && isHomePage))}
            showUserBar={true}
            user={user}
          />
        ) : (
          <AuthNav isHomePage={isHomePage} showAuthNav={!isMobile} />
        )}
        <BurgerMenu
          isHomePage={isHomePage}
          showLogout={!(isMobile || (isTablet && !isHomePage))}
        />
      </div>
    </header>
  );
};

export default Header;
