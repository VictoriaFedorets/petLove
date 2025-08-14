import css from "./NoticesItem.module.css";
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
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import { useLocation } from "react-router-dom";
import { selectUserViewed } from "../../redux/user/userSelectors";
import { addViewedNotice } from "../../redux/user/userSlice";

export default function NoticesItem({
  notice,
  isFavorite = false,
  onRemoveFavorite,
  className = "",
}) {
  const location = useLocation();
  const isProfilePage = location.pathname === "/profile";
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const isLoading = useSelector(selectFavoritesLoading);
  const viewedNotices = useSelector(selectUserViewed);

  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!notice) return null;

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

  const toggleModal = async () => {
    if (!isModalOpen) {
      const alreadyViewed =
        Array.isArray(viewedNotices) &&
        viewedNotices.some((item) => item._id === _id);
      if (!alreadyViewed) {
        dispatch(addViewedNotice(notice));
      }
    }
    setIsModalOpen((prev) => !prev);
  };

  const isFavoriteLocal = isFavorite || favorites.includes(_id);

  const handleToggleFavorite = async () => {
    if (isLoading) return;

    if (isFavoriteLocal) {
      const result = await dispatch(removeFromFavorites(_id));

      if (result.meta.requestStatus === "fulfilled" && onRemoveFavorite) {
        onRemoveFavorite(_id);
      }
    } else {
      dispatch(addToFavorites(_id));
    }
  };

  return (
    <li className={clsx(css.newsItem, className)}>
      <div
        className={clsx(css.imgContainer, isProfilePage ? css.imgProfile : "")}
      >
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

      <ul
        className={clsx(
          css.descriptionBlock,
          isProfilePage ? css.descrBlockProfile : ""
        )}
      >
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

      <p className={clsx(css.comment, isProfilePage ? css.commentProfile : "")}>
        {comment}
      </p>

      <div className={css.bottomContent}>
        <p className={css.price}>{price ? `$${price}` : "free"}</p>

        <div className={css.btnBlock}>
          <button
            className={clsx(css.btn, isProfilePage ? css.btnProfile : "")}
            onClick={toggleModal}
          >
            Learn more
          </button>
          {isModalOpen && <ModalNotice onClose={toggleModal} notice={notice} />}

          <button
            className={clsx(
              css.btnHeart,
              isProfilePage ? css.btnHeartProfile : ""
            )}
            onClick={handleToggleFavorite}
            aria-pressed={isFavoriteLocal}
            type="button"
          >
            <svg
              className={`${css.iconHeart} ${
                isFavoriteLocal ? css.iconHeartActive : ""
              }`}
            >
              <use
                href={isFavoriteLocal ? "#icon-heart" : "#icon-heart-outline"}
              ></use>
            </svg>
          </button>
        </div>
      </div>
    </li>
  );
}
