import { useLocation, Outlet } from "react-router-dom";
import Header from "../Header/Header.jsx";
import css from "./SharedLayout.module.css";

export default function SharedLayout() {
  const location = useLocation();
  const isHomePage = location.pathname === "/home";

  return (
    <div className={css.container}>
      {!isHomePage && <Header />}
      <main className={css.section}>
        <Outlet />
      </main>
    </div>
  );
}
