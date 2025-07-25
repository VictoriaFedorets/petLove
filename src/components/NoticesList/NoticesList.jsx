import { useDispatch, useSelector } from "react-redux";
import css from "./NoticesList.module.css";
import {
  selectNotices,
  selectNoticesIsLoading,
} from "../../redux/notices/noticesSelectors";
import NoticesItem from "../NoticesItem/NoticesItem.jsx";
import { useEffect } from "react";
import { fetchFavorites } from "../../redux/favorites/favoritesOperations.js";

export default function NoticesList() {
  const noticesList = useSelector(selectNotices);
  const isLoading = useSelector(selectNoticesIsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  if (isLoading) {
    return <p className={css.loading}>Loading...</p>;
  }

  if (noticesList.length === 0) {
    return <p className={css.noResults}>No notices found</p>;
  }

  return (
    <ul className={css.noticesList}>
      {noticesList.map(
        (notice) => notice && <NoticesItem key={notice._id} notice={notice} />
      )}
    </ul>
  );
}
