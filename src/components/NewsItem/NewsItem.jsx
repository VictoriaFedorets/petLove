import css from "./NewsItem.module.css";

export default function NewsItem({ news }) {
  const { imgUrl, title, text, date, url } = news;
  const formattedDate = new Date(date).toLocaleDateString("en-GB");

  return (
    <li className={css.newsItem}>
      <img className={css.img} src={imgUrl} alt={title} />
      <h2 className={css.title}>{title}</h2>
      <p className={css.text}>{text}</p>
      <div className={css.dateBlock}>
        <p className={css.date}>{formattedDate}</p>
        <a
          className={css.url}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Read more
        </a>
      </div>
    </li>
  );
}
