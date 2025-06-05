import clsx from "clsx";
import BaseModal from "../BaseModal/BaseModal";
import css from "./ModalNotice.module.css";

export default function ModalNotice({ onClose, notices }) {
  const {
    imgURL,
    title,
    popularity,
    name,
    birthday,
    sex,
    species,
    category,
    comment,
    price,
  } = notices;

  return (
    <BaseModal onClose={onClose} className={css.modal}>
      <div className={css.newsItem}>
        <img className={css.img} src={imgURL} alt={title} />
        <h2 className={css.title}>{title}</h2>
        <svg className={css.iconStar}>
          <use href="#icon-star"></use>
        </svg>

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
          <li>
            <p>Category</p>
            {category}
          </li>
        </ul>

        <p className={css.comment}>{comment}</p>
        <p className={css.price}>{price ? `$${price}` : "free"}</p>

        <div className={css.btnBlock}>
          <button className={css.btn}>Add to</button>
          <button className={clsx(css.btn, css.btnContact)}>Contact</button>
        </div>
      </div>
    </BaseModal>
  );
}
