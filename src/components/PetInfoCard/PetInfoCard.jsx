import css from "./PetInfoCard.module.css";

export default function PetInfoCard({ petIcon, name, birthday, description }) {
  return (
    <div className={css.card}>
      <div className={css.wrapperIcon}>
        <img src={petIcon} alt="pet icon" className={css.icon} />
      </div>

      <div className={css.info}>
        <div className={css.header}>
          <span className={css.name}>{name}</span>
          <span className={css.birthday}>
            <b>Birthday:</b> {birthday}
          </span>
        </div>
        <p className={css.text}>{description}</p>
      </div>
    </div>
  );
}
