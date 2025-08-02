import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <div className={css.wrapper}>
      <div className={css.content}>
        <h2 className={css.title}>
          4
          <picture>
            <source
              media="(min-width: 1280px)"
              srcSet="/icons/bg-not-found-desk.svg"
              type="image/svg+xml"
            />
            <source
              media="(min-width: 768px)"
              srcSet="/icons/bg-not-found-tabl.svg"
              type="image/svg+xml"
            />
            <img
              src="/icons/bg-not-found-mob.svg"
              alt="Cat"
              className={css.image}
              loading="lazy"
            />
          </picture>
          4
        </h2>

        <p className={css.message}>Ooops! This page not found :(</p>

        <Link to="/home" className={css.link}>
          To home page
        </Link>
      </div>
    </div>
  );
}
