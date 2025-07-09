import Title from "../../components/Title/Title";
import NoticesFilters from "../../components/NoticesFilters/NoticesFilters.jsx";
import NoticesList from "../../components/NoticesList/NoticesList.jsx";
import Paginaton from "../../components/Pagination/Pagination.jsx";
import css from "./NoticesPage.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotices } from "../../redux/notices/noticesOperations";
import {
  selectNoticesPage,
  selectNoticesTotalPages,
} from "../../redux/notices/noticesSelectors.js";
import { setNoticesPage } from "../../redux/notices/noticesSlice.js";

export default function NoticesPage() {
  const dispatch = useDispatch();
  const currentPage = useSelector(selectNoticesPage);
  const totalPages = useSelector(selectNoticesTotalPages);

  useEffect(() => {
    dispatch(getNotices({ page: currentPage }));
  }, [dispatch, currentPage]);

  const handlePageChange = (newPage) => {
    dispatch(setNoticesPage(newPage));
  };

  return (
    <div className={css.wrapper}>
      <Title>Find your favorite pet</Title>
      <NoticesFilters />
      <NoticesList />
      <Paginaton
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
