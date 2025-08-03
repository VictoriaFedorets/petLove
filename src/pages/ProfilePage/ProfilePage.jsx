import UserCard from "../../components/UserCard/UserCard";
import MyNotices from "../../components/MyNotices/MyNotices";
import css from "./ProfilePage.module.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { updateUser } from "../../redux/user/userOperations";

export default function ProfilePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateUser());
  }, [dispatch]);

  return (
    <section className={css.container}>
      <UserCard />
      <MyNotices />
    </section>
  );
}
