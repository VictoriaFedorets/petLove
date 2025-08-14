import css from "./ModalAttention.module.css";
import { useNavigate } from "react-router-dom";
import BaseModal from "../BaseModal/BaseModal";
import dogImg from "../../assets/dog.png";

export default function ModalAttention({ onClose, onRedirect }) {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    if (onRedirect) onRedirect();
    navigate("/login");
  };

  const handleRegisterClick = () => {
    if (onRedirect) onRedirect();
    navigate("/register");
  };

  return (
    <BaseModal onClose={onClose} className={css.modalAttention}>
      <img className={css.img} src={dogImg} alt="dog" />

      <h2 className={css.title}>Attention</h2>

      <p className={css.message}>
        We would like to remind you that certain functionality is available only
        to authorized users.If you have an account, please log in with your
        credentials. If you do not already have an account, you must register to
        access these features.
      </p>

      <div className={css.btnBlock}>
        <button className={css.btnLogin} onClick={handleLoginClick}>
          Log In
        </button>
        <button className={css.btnRegistration} onClick={handleRegisterClick}>
          Registration
        </button>
      </div>
    </BaseModal>
  );
}
