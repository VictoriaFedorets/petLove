import { useEffect } from "react";
import ReactDOM from "react-dom";
import css from "./BaseModal.module.css";

export default function BaseModal({ onClose, children, className = "" }) {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={`${css.modal} ${className}`}>
        <button className={css.closeButton} onClick={onClose}>
          <svg className={css.iconClose}>
            <use href="#icon-close"></use>
          </svg>
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}
