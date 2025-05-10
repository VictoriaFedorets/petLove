import { useSelector } from "react-redux";
import css from "./NoticesList.module.css";
import { selectNotices } from "../../redux/notices/noticesSelectors";
import NoticesItem from "../NoticesItem/NoticesItem.jsx";

export default function NoticesList() {
  const noticesList = useSelector(selectNotices);
  // console.log(selectNotices);

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
