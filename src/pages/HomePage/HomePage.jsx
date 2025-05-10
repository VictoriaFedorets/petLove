import Header from "../../components/Header/Header";
import css from "./HomePage.module.css";

export default function HomePage() {
  return (
    <section className={css.containerHome}>
      <article className={css.homeBg}>
        <Header />
        <div className={css.wrapper}>
          <h1 className={css.title}>
            Take good <span>care</span> of your small pets
          </h1>
          <p className={css.text}>
            Choosing a pet for your home is a choice that is meant to enrich
            your life with immeasurable joy and tenderness.
          </p>
        </div>
      </article>

      <div className={css.pictureBg}></div>
    </section>
  );
}
