import css from "./PetsBlock.module.css";

export default function PetsBlock() {
  return (
    <div className={css.addPets}>
      <h1 className={css.title}>My pets</h1>
      <button className={css.btnAddPet}>
        Add pet{""}{" "}
        <svg className={css.iconPlus}>
          <use href="#icon-plus" width="18" height="18"></use>
        </svg>
      </button>
    </div>
  );
}
