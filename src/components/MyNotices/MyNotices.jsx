import { useState, useEffect } from "react";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import css from "./MyNotices.module.css";
import NoticesItem from "../NoticesItem/NoticesItem";
import { fetchFavorites } from "../../redux/favorites/favoritesOperations";

const TABS = {
  FAVORITES: "My favorite pets",
  VIEWED: "Viewed",
};

export default function MyNotices() {
  const [activeTab, setActiveTab] = useState(TABS.FAVORITES);
  const [favoriteNotices, setFavoriteNotices] = useState([]);

  // console.log(favoriteNotices);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFavorites()).then(({ payload }) => {
      setFavoriteNotices(payload);
    });
  }, [dispatch]);

  const handleRemoveFromFavorites = (idToRemove) => {
    setFavoriteNotices((prev) =>
      prev.filter((item) => item._id !== idToRemove)
    );
  };

  return (
    <div className={css.container}>
      <div className={css.tabs}>
        {Object.values(TABS).map((tab) => (
          <button
            key={tab}
            className={clsx(css.tab, activeTab === tab ? css.active : "")}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className={css.content}>
        {activeTab === TABS.FAVORITES && favoriteNotices.length === 0 && (
          <p className={css.message}>
            Oops, looks like there aren't any furries on our adorable page yet.
            Do not worry! View your pets on the "find your favorite pet" page
            and add them to your favorites.
          </p>
        )}

        {activeTab === TABS.FAVORITES && favoriteNotices.length > 0 && (
          <ul className={css.list}>
            {favoriteNotices.map((notice) => (
              <NoticesItem
                key={notice._id}
                notice={notice}
                isFavorite={true}
                onRemoveFavorite={handleRemoveFromFavorites}
              />
            ))}
          </ul>
        )}

        {activeTab === TABS.VIEWED && (
          <p className={css.message}>Viewed list is empty.</p>
        )}
      </div>
    </div>
  );
}
