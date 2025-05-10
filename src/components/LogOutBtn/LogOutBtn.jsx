import css from "./LogOutBtn.module.css";

export default function LogOutBtn({ isHomePage }) {
  return <button className={css.btnLogOut}>Log out</button>;
}
