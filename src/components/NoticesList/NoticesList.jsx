import { useSelector } from "react-redux";
import css from "./NoticesList.module.css";
import {
  selectNotices,
  selectNoticesIsLoading,
} from "../../redux/notices/noticesSelectors";
import NoticesItem from "../NoticesItem/NoticesItem.jsx";

export default function NoticesList() {
  const noticesList = useSelector(selectNotices);
  // console.log(selectNotices);
  const isLoading = useSelector(selectNoticesIsLoading);

  if (isLoading) {
    return <p className={css.loading}>Loading...</p>; // або спінер
  }

  if (noticesList.length === 0) {
    return <p className={css.noResults}>No notices found</p>;
  }

  return (
    <ul className={css.noticesList}>
      {noticesList.map((notices) => (
        <NoticesItem key={notices._id} notices={notices} />
      ))}
    </ul>
  );
}
