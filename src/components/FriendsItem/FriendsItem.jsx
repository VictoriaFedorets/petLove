import css from "./FriendsItem.module.css";

export default function FriendsItem({ friend }) {
  const { title, imageUrl, email, url, addressUrl, address, phone, workDays } =
    friend;
  //   console.log(friend);

  const isOpen = workDays?.find((day) => day.isOpen);

  const workingHours = isOpen
    ? `${isOpen.from} - ${isOpen.to}`
    : "Day and night";

  return (
    <li className={css.friendsItem}>
      <img className={css.img} src={imageUrl} alt={title} />
      <p className={css.workingHours}>{workingHours}</p>
      <div>
        <h2 className={css.title}>{title}</h2>

        <ul className={css.contactsList}>
          {email && (
            <li className={css.contacts}>
              Email:{" "}
              <a className={css.link} href={`mailto:${email}`}>
                {email}
              </a>
            </li>
          )}

          <li className={css.contacts}>
            Address:{" "}
            {address && addressUrl ? (
              <a
                className={css.link}
                href={addressUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {address}
              </a>
            ) : (
              <a
                className={css.link}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
              >
                website only
              </a>
            )}
          </li>

          <li className={css.contacts}>
            Phone:{" "}
            {phone ? (
              <a className={css.link} href={`tel:${phone}`}>
                {phone}
              </a>
            ) : (
              <span className={css.link}>email only</span>
            )}
          </li>
        </ul>
      </div>

      {/* <div className={css.dateBlock}>
        <p className={css.date}>{formattedDate}</p>
        <a
          className={css.url}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Read more
        </a>
      </div> */}
    </li>
  );
}
