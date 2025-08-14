import css from "./NoticesList.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectNoticesIsLoading } from "../../redux/notices/noticesSelectors";
import NoticesItem from "../NoticesItem/NoticesItem.jsx";
import { useEffect, useMemo } from "react";
import { fetchFavorites } from "../../redux/favorites/favoritesOperations.js";
import Loader from "../Loader/Loader.jsx";

export default function NoticesList({ notices = [], sort }) {
  const isLoading = useSelector(selectNoticesIsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  const parsePrice = (notice) => {
    if (notice.category === "free") return 0;

    const price = notice.price;

    if (price === null || price === undefined) return Infinity;

    if (typeof price === "string") {
      if (price.toLowerCase() === "free") return 0;
      const num = Number(price);
      return isNaN(num) ? Infinity : num;
    }
    if (typeof price === "number") return price;
    return Infinity;
  };

  const sortedNotices = useMemo(() => {
    const sorted = [...notices];

    if (sort === "freeFirst_true") {
      sorted.sort((a, b) => {
        const priceA = parsePrice(a);
        const priceB = parsePrice(b);

        if (priceA === 0 && priceB !== 0) return -1;
        if (priceA !== 0 && priceB === 0) return 1;
        return priceA - priceB;
      });
    } else if (sort === "freeLast_true") {
      sorted.sort((a, b) => {
        const priceA = parsePrice(a);
        const priceB = parsePrice(b);

        if (priceA === 0 && priceB !== 0) return 1;
        if (priceA !== 0 && priceB === 0) return -1;
        return priceA - priceB;
      });
    }

    return sorted;
  }, [notices, sort]);

  if (isLoading) {
    return <Loader />;
  }

  if (!sortedNotices.length) {
    return <p className={css.loading}>No notices found</p>;
  }

  return (
    <ul className={css.noticesList}>
      {sortedNotices.map(
        (notice) => notice && <NoticesItem key={notice._id} notice={notice} />
      )}
    </ul>
  );
}
