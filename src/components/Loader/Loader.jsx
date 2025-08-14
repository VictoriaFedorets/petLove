import { ClipLoader } from "react-spinners";
import css from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={css.loaderContainer}>
      <ClipLoader
        size={100}
        color="var(--yellow-hover)"
        loading={true}
        className={css.loader}
      />
    </div>
  );
}
