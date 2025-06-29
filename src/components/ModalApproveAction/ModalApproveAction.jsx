import BaseModal from "../BaseModal/BaseModal";
import css from "./ModalApproveAction.module.css";

export default function ModalApproveAction({ onApprove, onClose }) {
  return (
    <BaseModal onClose={onClose}>
      <div className={css.modalWrapper}>
        <img className={css.img} src="/src/assets/cat.png" alt="cat" />
        <h3 className={css.title}>Already leaving?</h3>
        <div className={css.btnBlock}>
          <button className={css.btnYes} onClick={onApprove}>
            Yes
          </button>
          <button className={css.btnCancel} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </BaseModal>
  );
}
