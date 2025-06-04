import LoginForm from "../../components/LoginForm/LoginForm.jsx";
import PetBlock from "../../components/PetBlock/PetBlock.jsx";
import css from "./LoginPage.module.css";

export default function LoginPage() {
  return (
    <div className={css.login}>
      <PetBlock src="/images/login/mob/dog-mob-x1.png" />
      <LoginForm />
    </div>
  );
}
