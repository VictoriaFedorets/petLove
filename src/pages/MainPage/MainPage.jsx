import { Link } from "react-router-dom";
import css from "./MainPage.module.css";
import Header from "../../components/Header/Header";

export default function MainPage() {
  return (
    <section className={css.hero}>
      <Link to="./home" className={css.btnLogo}>
        <img src="/icons/logo.svg" alt="Logo" />
      </Link>
    </section>
  );
}
