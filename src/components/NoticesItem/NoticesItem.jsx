import { useState } from "react";
import ModalNotice from "../ModalNotice/ModalNotice";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../redux/favorites/favoritesOperations";
import {
  selectFavorites,
  selectFavoritesLoading,
} from "../../redux/favorites/favoritesSelectors";
import css from "./NoticesItem.module.css";
import { useDispatch, useSelector } from "react-redux";

export default function NoticesItem({ notices }) {
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
  } = notices;
  //   const formattedDate = new Date(date).toLocaleDateString("en-GB");

  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  // console.log("favorites", favorites);
  const isLoading = useSelector(selectFavoritesLoading);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  // console.log(notices);

  const isFavorite = favorites.includes(_id);
  const handleToggleFavorite = () => {
    if (isLoading) return;

    if (isFavorite) {
      dispatch(removeFromFavorites(_id));
    } else {
      dispatch(addToFavorites(_id));
    }
  };

  return (
    <li className={css.newsItem}>
      <div className={css.imgContainer}>
        <img
          className={css.img}
          onClick={toggleModal}
          src={imgURL}
          alt={title}
        />
      </div>

      <div className={css.titleBlock}>
        <h2 className={css.title}>{title}</h2>
        <p className={css.popularity}>
          <svg className={css.iconStar}>
            <use href="#icon-star"></use>
          </svg>
          <span className={css.popularity}>{popularity}</span>
        </p>
      </div>

      <ul className={css.descriptionBlock}>
        <li className={css.name}>
          <p>Name</p>
          {name}
        </li>
        <li>
          <p>Birthday</p>
          {birthday ? birthday : "unknown"}
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

      <div className={css.bottomContent}>
        <p className={css.price}>{price ? `$${price}` : "free"}</p>

        <div className={css.btnBlock}>
          <button className={css.btn} onClick={toggleModal}>
            Learn more
          </button>
          {isModalOpen && (
            <ModalNotice onClose={toggleModal} notices={notices} />
          )}

          <button
            className={css.btnHeart}
            onClick={handleToggleFavorite}
            aria-pressed={isFavorite}
            type="button"
          >
            <svg
              className={`${css.iconHeart} ${
                isFavorite ? css.iconHeartActive : ""
              }`}
            >
              <use
                href={isFavorite ? "#icon-heart" : "#icon-heart-outline"}
              ></use>
            </svg>
          </button>
        </div>
      </div>
    </li>
  );
}
