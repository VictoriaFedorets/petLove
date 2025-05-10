import css from "./NoticesItem.module.css";

export default function NoticesItem({ notices }) {
  const {
    imgURL,
    title,
    popularity,
    name,
    birthday,
    sex,
    species,
    category,
    comment,
    price,
  } = notices;
  //   const formattedDate = new Date(date).toLocaleDateString("en-GB");

  return (
    <li className={css.newsItem}>
      {/* <img className={css.img} src={imgURL} alt={title} /> */}
      <div className={css.imgContainer}>
        <img className={css.img} src={imgURL} alt={title} />
      </div>

      <div className={css.titleBlock}>
        <h2 className={css.title}>{title}</h2>
        <p className={css.popularity}>
          <svg className={css.iconStar}>
            <use href="#icon-star"></use>
          </svg>
          <span className={css.popularity}>{popularity}</span>
        </p>
      </div>

      <ul className={css.descriptionBlock}>
        <li>
          <p>Name</p>
          {name}
        </li>
        <li>
          <p>Birthday</p>
          {birthday}
        </li>
        <li>
          <p>Sex</p>
          {sex}
        </li>
        <li>
          <p>Species</p>
          {species}
        </li>
        <li>
          <p>Category</p>
          {category}
        </li>
      </ul>

      <p className={css.comment}>{comment}</p>
      <p className={css.price}>{price ? `$${price}` : "free"}</p>

      <div className={css.btnBlock}>
        <button className={css.btn}>Learn more</button>
        <button className={css.btnHeart}>
          <svg className={css.iconHeart}>
            <use href="#icon-heart"></use>
          </svg>
        </button>
      </div>
    </li>
  );
}
