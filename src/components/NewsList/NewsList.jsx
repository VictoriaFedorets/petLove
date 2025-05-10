import { useSelector } from "react-redux";
import css from "./NewsList.module.css";
import { selectNews } from "../../redux/news/newsSelectors";
import NewsItem from "../NewsItem/NewsItem";

export default function NewsList() {
  const newsList = useSelector(selectNews);
  // console.log(newsList);

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
