import css from "./UserCard.module.css";
import EditUserBtn from "../EditUserBtn/EditUserBtn";
import UserBlock from "../UserBlock/UserBlock";

export default function UserCard() {
  return (
    <div className={css.wrapperCard}>
      <EditUserBtn />
      <UserBlock />
      {/* <PetsBlock />
      <LogOutBtn /> */}
    </div>
  );
}
