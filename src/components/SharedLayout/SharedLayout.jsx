import css from "./SharedLayout.module.css";
import { useLocation, Outlet } from "react-router-dom";
import Header from "../Header/Header.jsx";
import clsx from "clsx";

export default function SharedLayout() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isAddPetPage = location.pathname === "/add-pet";
  const isRegisterPage = location.pathname === "/register";
  const isNoticesPage = location.pathname === "/notices";

  return (
    <div
      className={clsx(
        css.container,
        (isHomePage || isAddPetPage || isRegisterPage || isNoticesPage) &&
          css.containerHome
      )}
    >
      {!isHomePage && <Header />}
      <main className={css.section}>
        <Outlet />
      </main>
    </div>
  );
}
