import css from "./ModalEditUser.module.css";
import BaseModal from "../BaseModal/BaseModal";

export default function ModalEditUser({ onClose }) {
  return (
    <BaseModal onClose={onClose}>
      <h1>Modal</h1>
    </BaseModal>
  );
}
