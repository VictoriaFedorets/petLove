import { useLocation } from "react-router-dom";
import clsx from "clsx";
import css from "./PetBlock.module.css";

export default function PetBlock({ src }) {
  const location = useLocation();
  const isAddPetPage = location.pathname === "/add-pet";

  return (
    <div className={clsx(css.background, isAddPetPage && css.backgroundAddPet)}>
      <img
        className={clsx(css.image, isAddPetPage && css.imageAddPet)}
        src={src}
        alt="image"
      />
    </div>
  );
}
