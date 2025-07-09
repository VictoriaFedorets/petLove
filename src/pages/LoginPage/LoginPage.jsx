import LoginForm from "../../components/LoginForm/LoginForm.jsx";
import PetBlock from "../../components/PetBlock/PetBlock.jsx";
import PetInfoCard from "../../components/PetInfoCard/PetInfoCard.jsx";
import css from "./LoginPage.module.css";

export default function LoginPage() {
  return (
    <div className={css.login}>
      <PetBlock
        srcMob="/icons/bg-log-dog-mob.svg"
        srcTab="/icons/bg-log-dog-tabl.svg"
        srcDesk="/icons/bg-log-dog-desk.svg"
      />
      <PetInfoCard
        petIcon="../../../icons/dog.png"
        name="Rich"
        birthday="21.09.2020"
        description="Rich would be the perfect addition to an active family that loves to play and go on walks. I bet he would love having a doggy playmate too!"
      />
      <LoginForm />
    </div>
  );
}
