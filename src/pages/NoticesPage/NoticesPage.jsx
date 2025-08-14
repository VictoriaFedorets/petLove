import css from "./NoticesPage.module.css";
import Title from "../../components/Title/Title";
import NoticesFilters from "../../components/NoticesFilters/NoticesFilters.jsx";
import NoticesList from "../../components/NoticesList/NoticesList.jsx";
import Pagination from "../../components/Pagination/Pagination.jsx";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotices } from "../../redux/notices/noticesOperations";
import {
  selectFilters,
  selectNoticesPage,
  selectNoticesPerPage,
  selectNoticesTotalPages,
  selectNotices,
} from "../../redux/notices/noticesSelectors.js";
import { setNoticesPage } from "../../redux/notices/noticesSlice.js";

export default function NoticesPage() {
  const dispatch = useDispatch();
  const currentPage = useSelector(selectNoticesPage);
  const totalPages = useSelector(selectNoticesTotalPages);
  const filters = useSelector(selectFilters);
  const perPage = useSelector(selectNoticesPerPage);
  const notices = useSelector(selectNotices);

  const handlePageChange = (newPage) => {
    dispatch(setNoticesPage(newPage));
  };

  useEffect(() => {
    const { sort, ...filtersWithoutSort } = filters;
    dispatch(getNotices({ ...filtersWithoutSort, page: currentPage, perPage }));
  }, [dispatch, currentPage, filters, perPage]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  return (
    <div className={css.wrapper}>
      <Title>Find your favorite pet</Title>
      <NoticesFilters />
      <NoticesList notices={notices} sort={filters.sort} />
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
