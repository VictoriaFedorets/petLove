import { useSelector } from "react-redux";
import css from "./NewsList.module.css";
import {
  selectNews,
  selectNewsIsLoading,
} from "../../redux/news/newsSelectors";
import NewsItem from "../NewsItem/NewsItem";

export default function NewsList() {
  const newsList = useSelector(selectNews);
  const isLoading = useSelector(selectNewsIsLoading);
  // console.log(newsList);

  if (isLoading) {
    return <p className={css.loading}>Loading...</p>;
  }

  if (newsList.length === 0) {
    return <p className={css.noResults}>No news found</p>;
  }

  return (
    <ul className={css.newsList}>
      {newsList.map((news) => (
        <NewsItem key={news.id} news={news} />
      ))}
    </ul>
  );
}
