import clsx from "clsx";
import BaseModal from "../BaseModal/BaseModal";
import { selectIsLoggedIn } from "../../redux/user/userSelectors.js";
import ModalAttention from "../ModalAttention/ModalAttention.jsx";
import css from "./ModalNotice.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  selectFavorites,
  selectIsFavoritesId,
} from "../../redux/favorites/favoritesSelectors.js";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../redux/favorites/favoritesOperations.js";
import { fetchFavorites } from "../../redux/favorites/favoritesOperations";

import { toast } from "react-toastify";

export default function ModalNotice({ onClose, notice }) {
  const {
    _id,
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
  } = notice;

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [isAttentionOpen, setIsAttentionOpen] = useState(false);
  const favorites = useSelector(selectFavorites);

  const isFavorite = favorites.includes(_id);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchFavorites());
    }
  }, [dispatch, isLoggedIn]);

  const handleAddToClick = () => {
    if (!isLoggedIn) {
      setIsAttentionOpen(true);
      return;
    }

    if (isFavorite) {
      dispatch(removeFromFavorites(_id));
      // toast.info("Already in favorites");
    } else {
      dispatch(addToFavorites(_id));
    }
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
          <p className={css.popularity}>
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                className={css.iconStar}
                style={{
                  fill:
                    index < Math.min(Math.floor(popularity), 5)
                      ? "#ffc107"
                      : "#d3d3d3",
                }}
              >
                <use href="#icon-star" />
              </svg>
            ))}
            <span className={css.popularity}>{popularity}</span>
          </p>

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
              {isFavorite ? "Remove from" : "Add to"}
              <svg
                className={`${css.iconHeart} ${
                  isFavorite && css.iconHeartActive
                }`}
              >
                <use href={`#icon-heart${isFavorite ? "" : "-outline"}`} />
              </svg>
            </button>

            <button className={clsx(css.btn, css.btnContact)}>Contact</button>
          </div>
        </div>
      </BaseModal>
    </>
  );
}
