import clsx from "clsx";
import css from "./UserBar.module.css";

export default function UserBar({ isHomePage, user }) {
  if (!user) return null;

  return (
    <div className={css.userBar}>
      <button className={css.userBtn}>
        <svg className={css.closeUser}>
          <use href="#icon-user" />
        </svg>
      </button>
      <h3 className={clsx(css.userName, isHomePage && css.userNameHome)}>
        {user.name}
      </h3>
    </div>
  );
}
