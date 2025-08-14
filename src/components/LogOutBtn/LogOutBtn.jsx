import { useDispatch } from "react-redux";
import css from "./LogOutBtn.module.css";
import { logoutUser } from "../../redux/user/userOperations.js";
import { useState } from "react";
import ModalApproveAction from "../ModalApproveAction/ModalApproveAction";
import clsx from "clsx";

export default function LogOutBtn({ isHomePage, onCloseMenu, className = "" }) {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    onCloseMenu?.();
    setTimeout(() => {
      setIsModalOpen(true);
    }, 300);
  };

  const closeModal = () => setIsModalOpen(false);

  const confirmLogout = async () => {
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
