import css from "./PetsItem.module.css";
import { useDispatch } from "react-redux";
import { removePet } from "../../redux/user/userOperations";
import { format } from "date-fns";
import { DATE_FORMAT_DDMMYYYY } from "../../helpers/constants";

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
          <li className={css.name}>
            <p>Name</p>
            <span className={css.nameText}>{name}</span>
          </li>
          <li>
            <p>Birthday</p>
            {birthday ? format(new Date(birthday), DATE_FORMAT_DDMMYYYY) : null}
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
