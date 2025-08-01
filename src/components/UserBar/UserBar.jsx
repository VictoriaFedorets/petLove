import { Link } from "react-router-dom";
import clsx from "clsx";
import css from "./UserBar.module.css";

export default function UserBar({ isHomePage, user }) {
  if (!user) return null;

  return (
    <Link to="/profile" className={css.userBar}>
      <div className={css.userBtn}>
        {user.avatar ? (
          <img src={user.avatar} alt="User avatar" className={css.imgAvatar} />
        ) : (
          <svg className={css.iconUser}>
            <use href="#icon-user" />
          </svg>
        )}
      </div>
      <h3 className={clsx(css.userName, isHomePage && css.userNameHome)}>
        {user.name}
      </h3>
    </Link>
  );
}
