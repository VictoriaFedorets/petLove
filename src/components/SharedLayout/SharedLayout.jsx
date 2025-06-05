import { useLocation, Outlet } from "react-router-dom";
import Header from "../Header/Header.jsx";
import css from "./SharedLayout.module.css";
import clsx from "clsx";

export default function SharedLayout() {
  const location = useLocation();
  const isHomePage = location.pathname === "/home";

  return (
    <div className={clsx(css.containerHome, !isHomePage && css.container)}>
      {!isHomePage && <Header />}
      <main className={css.section}>
        <Outlet />
      </main>
    </div>
  );
}
