import css from "./UserCard.module.css";
import EditUserBtn from "../EditUserBtn/EditUserBtn";
import UserBlock from "../UserBlock/UserBlock";
import PetsBlock from "../PetsBlock/PetsBlock.jsx";
import LogOutBtn from "../LogOutBtn/LogOutBtn.jsx";
import { useState } from "react";

export default function UserCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  return (
    <div className={css.wrapperCard}>
      <EditUserBtn onClick={handleOpen} />
      <UserBlock />
      <PetsBlock />
      <LogOutBtn className={css.btnLogOut} />
      {isModalOpen && <ModalEditUser onClose={handleClose} />}
    </div>
  );
}
