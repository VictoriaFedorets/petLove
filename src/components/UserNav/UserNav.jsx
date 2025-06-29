import LogOutBtn from "../LogOutBtn/LogOutBtn";
import UserBar from "../UserBar/UserBar";
import css from "./UserNav.module.css";

export default function UserNav({
  isHomePage,
  onAction,
  showLogout = true,
  showUserBar = true,
  user,
}) {
  return (
    <div className={css.userNav}>
      {showLogout && (
        <LogOutBtn isHomePage={isHomePage} onCloseMenu={onAction} />
      )}
      {showUserBar && <UserBar isHomePage={isHomePage} user={user} />}
    </div>
  );
}
