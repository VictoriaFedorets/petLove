import { Link } from "react-router-dom";
import UserCard from "../../components/UserCard/UserCard";
import MyNotices from "../../components/MyNotices/MyNotices";

export default function ProfilePage() {
  return (
    <section>
      <UserCard />
      <MyNotices />
    </section>
  );
}
