import css from "./PetBlock.module.css";
import { useLocation } from "react-router-dom";
import clsx from "clsx";

export default function PetBlock({ srcMob, srcTab, srcDesk }) {
  const location = useLocation();
  const isAddPetPage = location.pathname === "/add-pet";
  const isRegisterPage = location.pathname === "/register";

  return (
    <div className={clsx(css.background, isAddPetPage && css.backgroundAddPet)}>
      <picture>
        <source media="(min-width: 1280px)" srcSet={srcDesk} />
        <source media="(min-width: 768px)" srcSet={srcTab} />
        <img
          className={clsx(
            css.image,
            isAddPetPage && css.imageAddPet,
            isRegisterPage && css.imageRegister
          )}
          src={srcMob}
          alt="image"
        />
      </picture>
    </div>
  );
}
