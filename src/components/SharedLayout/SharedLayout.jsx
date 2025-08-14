import { useLocation, Outlet } from "react-router-dom";
import Header from "../Header/Header.jsx";
import css from "./SharedLayout.module.css";
import clsx from "clsx";

export default function SharedLayout() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isAddPetPage = location.pathname === "/add-pet";
  const isRegisterPage = location.pathname === "/register";

  return (
    <div
      className={clsx(
        css.container,
        (isHomePage || isAddPetPage || isRegisterPage) && css.containerHome
      )}
    >
      {!isHomePage && <Header />}
      <main className={css.section}>
        <Outlet />
      </main>
    </div>
  );
}
