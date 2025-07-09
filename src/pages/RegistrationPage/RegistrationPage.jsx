import RegistrationForm from "../../components/RegistrationForm/RegistrationForm.jsx";
import PetBlock from "../../components/PetBlock/PetBlock.jsx";
import css from "./RegistrationPage.module.css";
import PetInfoCard from "../../components/PetInfoCard/PetInfoCard.jsx";

export default function RegistrationPage() {
  return (
    <div className={css.registration}>
      <PetBlock
        srcMob="/icons/bg-reg-cat-mob.svg"
        srcTab="/icons/bg-reg-cat-tabl.svg"
        srcDesk="/icons/bg-reg-cat-desk.svg"
      />
      <div className={css.petInfoWrapper}>
        <PetInfoCard
          petIcon="../../../icons/cat.png"
          name="Jack"
          birthday="18.10.2021"
          description="Jack is a gray Persian cat with green eyes. He loves to be pampered and groomed, and enjoys playing with toys."
        />
      </div>
      <RegistrationForm />
    </div>
  );
}
