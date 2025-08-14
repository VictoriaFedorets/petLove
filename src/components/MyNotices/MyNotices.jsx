import css from "./MyNotices.module.css";
import { useState, useEffect } from "react";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import NoticesItem from "../NoticesItem/NoticesItem";
import { fetchFavorites } from "../../redux/favorites/favoritesOperations";
import { selectUserViewed } from "../../redux/user/userSelectors";
import { getUniqueById } from "../../helpers/constants";

const TABS = {
  FAVORITES: "My favorite pets",
  VIEWED: "Viewed",
};

export default function MyNotices() {
  const [activeTab, setActiveTab] = useState(TABS.FAVORITES);
  const [favoriteNotices, setFavoriteNotices] = useState([]);

  const viewedNotices = useSelector(selectUserViewed);
  const [viewedLocal, setViewedLocal] = useState(viewedNotices);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFavorites()).then(({ payload }) => {
      setFavoriteNotices(payload);
    });
  }, [dispatch]);

  useEffect(() => {
    setViewedLocal(viewedNotices);
  }, [viewedNotices]);

  const handleViewedUpdate = (newViewedNotice) => {
    setViewedLocal((prev) => {
      if (prev.some((n) => n._id === newViewedNotice._id)) return prev;
      return [...prev, newViewedNotice];
    });
  };

  const handleRemoveFromFavorites = (idToRemove) => {
    setFavoriteNotices((prev) =>
      prev.filter((item) => item._id !== idToRemove)
    );
  };

  const uniqueFavoriteNotices = getUniqueById(favoriteNotices);
  const uniqueViewedNotices = getUniqueById(viewedNotices);

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

        {activeTab === TABS.FAVORITES && uniqueFavoriteNotices.length > 0 && (
          <ul className={css.list}>
            {uniqueFavoriteNotices.map((notice) => (
              <NoticesItem
                className={css.favoriteItem}
                key={notice._id}
                notice={notice}
                isFavorite={true}
                onRemoveFavorite={handleRemoveFromFavorites}
              />
            ))}
          </ul>
        )}

        {activeTab === TABS.VIEWED && viewedNotices.length === 0 && (
          <p className={css.message}>Viewed list is empty.</p>
        )}

        {activeTab === TABS.VIEWED && uniqueViewedNotices.length > 0 && (
          <ul className={css.list}>
            {uniqueViewedNotices.map((notice) => (
              <NoticesItem
                className={css.favoriteItem}
                key={notice._id}
                notice={notice}
                isFavorite={false}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
