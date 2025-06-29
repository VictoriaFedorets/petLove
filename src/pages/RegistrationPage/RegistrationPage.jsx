import RegistrationForm from "../../components/RegistrationForm/RegistrationForm.jsx";
import PetBlock from "../../components/PetBlock/PetBlock.jsx";
import css from "./RegistrationPage.module.css";

export default function RegistrationPage() {
  return (
    <div className={css.registration}>
      <PetBlock src="/images/login/mob/dog-mob-x1.png" />
      <RegistrationForm />
    </div>
  );
}
