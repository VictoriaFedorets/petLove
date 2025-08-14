import css from "./EditUserBtn.module.css";
import { useState } from "react";
import ModalEditUser from "../ModalEditUser/ModalEditUser.jsx";

export default function EditUserBtn() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  return (
    <>
      <button className={css.btnEdit} onClick={handleOpen}>
        <svg className={css.iconEdit} width="18" height="18">
          <use href="#icon-edit"></use>
        </svg>
      </button>

      {isModalOpen && <ModalEditUser onClose={handleClose} />}
    </>
  );
}
