import css from "./AddPet.module.css";
import { Link } from "react-router-dom";

export default function AddPet() {
  return (
    <div className={css.addPets}>
      <h1 className={css.title}>My pets</h1>
      <Link to="/add-pet" className={css.btnAddPet}>
        Add pet{""}
        <svg className={css.iconPlus}>
          <use href="#icon-plus" width="18" height="18"></use>
        </svg>
      </Link>
    </div>
  );
}
