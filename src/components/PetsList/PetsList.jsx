import { useSelector } from "react-redux";
import PetsItem from "../PetsItem/PetsItem";
import css from "./PetsList.module.css";
import { selectPets } from "../../redux/user/userSelectors";

export default function PetsList() {
  const petsList = useSelector(selectPets);

  return (
    petsList.length > 0 && (
      <ul className={css.petsList}>
        {petsList.map((pet) => (
          <PetsItem key={pet._id} pet={pet} />
        ))}
      </ul>
    )
  );
}
