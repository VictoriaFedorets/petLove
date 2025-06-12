import css from "./AddPetForm.module.css";

export default function AddPetForm() {
  return (
    <div className={css.wrapperAddPet}>
      <span className={css.title}>Add my pet /</span>
      <span className={css.titleDet}>Personal details</span>

      <div className={css.svgBlock}>
        <svg className={css.iconFemale}>
          <use href="#icon-female-gender"></use>
        </svg>
        <svg className={css.iconMale}>
          <use href="#icon-male-gender"></use>
        </svg>
        <svg className={css.iconMultiple}>
          <use href="#icon-multiple-gender"></use>
        </svg>
      </div>
    </div>
  );
}
