import css from "./MainPage.module.css";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";

export default function MainPage() {
  return (
    <section className={css.hero}>
      <Link to="./" className={css.btnLogo}>
        <img src="/icons/logo.svg" alt="Logo" />
      </Link>
    </section>
  );
}
