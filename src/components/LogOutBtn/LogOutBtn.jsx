import { useDispatch, useSelector } from "react-redux";
import css from "./LogOutBtn.module.css";
import { logoutUser } from "../../redux/user/userOperations.js";
import { useState } from "react";
import ModalApproveAction from "../ModalApproveAction/ModalApproveAction";
import { selectToken } from "../../redux/user/userSelectors.js";
import clsx from "clsx";

export default function LogOutBtn({ isHomePage, onCloseMenu, className = "" }) {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = useSelector(selectToken);
  // console.log("👀 TOKEN IN COMPONENT:", token);

  const openModal = () => {
    onCloseMenu?.(); // Закрити меню перед відкриттям модалки
    setTimeout(() => {
      setIsModalOpen(true);
    }, 300); // Почекати, поки меню сховається (відповідно до transition)
  };

  const closeModal = () => setIsModalOpen(false);

  const confirmLogout = async () => {
    // console.log("TOKEN IN LOGOUT BTN:", token);
    await dispatch(logoutUser());
    closeModal();
  };

  return (
    <>
      <button
        className={clsx(
          css.btnLogOut,
          !isHomePage && css.btnLogOutHeader,
          className
        )}
        onClick={openModal}
      >
        Log out
      </button>

      {isModalOpen && (
        <ModalApproveAction onApprove={confirmLogout} onClose={closeModal} />
      )}
    </>
  );
}
