import LogOutBtn from "../LogOutBtn/LogOutBtn";
import UserBar from "../UserBar/UserBar";
import css from "./UserNav.module.css";

export default function UserNav({ isHomePage }) {
  return (
    <>
      <LogOutBtn isHomePage={isHomePage} />
      <UserBar isHomePage={isHomePage} />
    </>
  );
}
