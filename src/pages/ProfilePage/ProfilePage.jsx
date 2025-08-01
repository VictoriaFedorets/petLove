import { Link } from "react-router-dom";
import UserCard from "../../components/UserCard/UserCard";
import MyNotices from "../../components/MyNotices/MyNotices";
import css from "./ProfilePage.module.css";

export default function ProfilePage() {
  return (
    <section className={css.container}>
      <UserCard />
      <MyNotices />
    </section>
  );
}
