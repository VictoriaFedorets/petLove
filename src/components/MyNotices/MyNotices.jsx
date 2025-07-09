import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFavorites,
  removeFromFavorites,
} from "../../redux/favorites/favoritesOperations";
import { selectFavorites } from "../../redux/favorites/favoritesSelectors";
import css from "./MyNotices.module.css";
import NoticesItem from "../NoticesItem/NoticesItem";

const TABS = {
  FAVORITES: "My favorite pets",
  VIEWED: "Viewed",
};

export default function MyNotices() {
  const [activeTab, setActiveTab] = useState(TABS.FAVORITES);
  const favorites = useSelector(selectFavorites);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  const handleRemove = (noticeId) => {
    dispatch(removeFromFavorites(noticeId));
  };

  const renderNotices = () => {
    if (activeTab === TABS.FAVORITES) {
      if (favorites.length === 0) {
        return (
          <p className={css.message}>
            Oops, looks like there aren't any furries on our adorable page yet.
            Do not worry! View your pets on the "find your favorite pet" page
            and add them to your favorites.
          </p>
        );
      }

      return (
        <ul className={css.list}>
          {favorites.map((notice) => (
            <NoticesItem
              key={notice._id}
              notices={notice}
              isFavorite={true}
              onDelete={() => handleRemove(notice._id)}
            />
          ))}
        </ul>
      );
    }

    if (activeTab === TABS.VIEWED) {
      return <p className={css.message}>Viewed list is empty.</p>;
    }

    return null;
  };

  return (
    <div className={css.container}>
      <div className={css.tabs}>
        {Object.values(TABS).map((tab) => (
          <button
            key={tab}
            className={`${css.tab} ${activeTab === tab ? css.active : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className={css.content}>{renderNotices()}</div>
    </div>
  );
}
