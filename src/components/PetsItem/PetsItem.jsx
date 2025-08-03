import { useDispatch } from "react-redux";
import css from "./PetsItem.module.css";
import { removePet } from "../../redux/user/userOperations";

export default function PetsItem({ pet }) {
  const { _id, name, title, imgURL, species, birthday, sex } = pet;
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(removePet(_id));
  };

  return (
    <div className={css.petsItem}>
      <img className={css.img} src={imgURL} alt={title} />

      <div className={css.titleBlock}>
        <h2 className={css.title}>{title}</h2>
        <ul className={css.descriptionBlock}>
          <li>
            <p>Name</p>
            {name}
          </li>
          <li>
            <p>Birthday</p>
            {birthday}
          </li>

          <li>
            <p>Sex</p>
            {sex}
          </li>

          <li>
            <p>Species</p>
            {species}
          </li>
        </ul>
      </div>

      <button className={css.btnBasket} onClick={handleDelete} type="button">
        <svg className={css.iconBasket}>
          <use href="#icon-basket"></use>
        </svg>
      </button>
    </div>
  );
}
