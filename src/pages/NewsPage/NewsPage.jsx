import Title from "../../components/Title/Title";
import SearchField from "../../components/SearchField/SearchField.jsx";
import NewsList from "../../components/NewsList/NewsList.jsx";
import Paginaton from "../../components/Pagination/Pagination.jsx";
import css from "./NewsPage.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNews } from "../../redux/news/newsOperations";
import {
  selectNewsPage,
  selectNewsTotalPages,
} from "../../redux/news/newsSelectors.js";
import { setNewsPage } from "../../redux/news/newsSlice.js";

export default function NewsPage() {
  const dispatch = useDispatch();
  const currentPage = useSelector(selectNewsPage);
  const totalPages = useSelector(selectNewsTotalPages);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(getNews({ page: currentPage, keyword: searchQuery }));
  }, [dispatch, currentPage, searchQuery]);

  const handlePageChange = (newPage) => {
    dispatch(setNewsPage(newPage));
  };

  const onSearch = (query) => {
    setSearchQuery(query);
    dispatch(setNewsPage(1)); // повертаємось на першу сторінку при новому пошуку
  };

  return (
    <>
      <div className={css.searchWrapper}>
        <Title>News</Title>
        <SearchField onSearch={onSearch} />
      </div>
      <NewsList />
      <Paginaton
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
}
