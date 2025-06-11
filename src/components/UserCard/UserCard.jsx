import css from "./UserCard.module.css";
import EditUserBtn from "../EditUserBtn/EditUserBtn";
import UserBlock from "../UserBlock/UserBlock";
import PetsBlock from "../PetsBlock/PetsBlock.jsx";
import LogOutBtn from "../LogOutBtn/LogOutBtn.jsx";

export default function UserCard() {
  return (
    <div className={css.wrapperCard}>
      <EditUserBtn />
      <UserBlock />
      <PetsBlock />
      <LogOutBtn />
    </div>
  );
}
