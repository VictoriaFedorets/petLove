import css from "./AddPetPage.module.css";
import PetBlock from "../../components/PetBlock/PetBlock";
import AddPetForm from "../../components/AddPetForm/AddPetForm";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getNotices,
  getNoticesSpecies,
} from "../../redux/notices/noticesOperations";
import { selectNoticesSpecies } from "../../redux/notices/noticesSelectors";

export default function AddPetPage() {
  const dispatch = useDispatch();
  const species = useSelector(selectNoticesSpecies);

  useEffect(() => {
    dispatch(getNotices());
    dispatch(getNoticesSpecies());
  }, [dispatch]);

  return (
    <div className={css.wrapper}>
      <PetBlock
        srcMob="/icons/bg-add-pet-mob.svg"
        srcTab="/icons/bg-add-pet-tabl.svg"
        srcDesk="/icons/bg-add-pet-desk.svg"
      />
      <AddPetForm species={species} />
    </div>
  );
}
