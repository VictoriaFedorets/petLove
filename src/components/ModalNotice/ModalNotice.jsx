import clsx from "clsx";
import BaseModal from "../BaseModal/BaseModal";
import { selectIsLoggedIn } from "../../redux/auth/authSelectors";
import ModalAttention from "../ModalAttention/ModalAttention.jsx";
import css from "./ModalNotice.module.css";
import { useSelector } from "react-redux";
import { useState } from "react";

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

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [isAttentionOpen, setIsAttentionOpen] = useState(false);

  const handleAddToClick = () => {
    if (!isLoggedIn) {
      setIsAttentionOpen(true);
      return;
    }

    // Якщо авторизований — додаємо до обраного
    console.log("Додано до улюблених");
  };

  const handleCloseAll = () => {
    setIsAttentionOpen(false);
    onClose();
  };

  // якщо відкритий Attention — рендеримо тільки його
  if (isAttentionOpen) {
    return (
      <ModalAttention
        onClose={() => setIsAttentionOpen(false)}
        onNavigate={handleCloseAll}
      />
    );
  }
  return (
    <>
      <BaseModal onClose={onClose} className={css.modal}>
        <div className={css.noticeItem}>
          <img className={css.img} src={imgURL} alt={title} />
          <p className={css.category}>{category}</p>
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
          </ul>

          <p className={css.comment}>{comment}</p>
          <p className={css.price}>{price ? `$${price}` : "free"}</p>

          <div className={css.btnBlock}>
            <button className={css.btn} onClick={handleAddToClick}>
              Add to{" "}
              <svg className={css.iconHeart}>
                <use
                  className={css.iconHeartUse}
                  href="#icon-heart"
                  fill="none"
                  stroke="#fff"
                ></use>
              </svg>
            </button>

            <button className={clsx(css.btn, css.btnContact)}>Contact</button>
          </div>
        </div>
      </BaseModal>

      {isAttentionOpen && (
        <ModalAttention onClose={closeAttentionModal} onRedirect={onClose} />
      )}
    </>
  );
}
