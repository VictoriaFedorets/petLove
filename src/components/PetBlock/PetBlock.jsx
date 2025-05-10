import css from "./PetBlock.module.css";

export default function PetBlock({ src }) {
  return (
    <div className={css.background}>
      <img className={css.image} src={src} alt="image" />
    </div>
  );
}
