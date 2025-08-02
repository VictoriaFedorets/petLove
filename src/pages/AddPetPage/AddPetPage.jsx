import PetBlock from "../../components/PetBlock/PetBlock";
import AddPetForm from "../../components/AddPetForm/AddPetForm";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getNotices } from "../../redux/notices/noticesOperations";
import css from "./AddPetPage.module.css";

export default function AddPetPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotices());
  }, [dispatch]);

  return (
    <div className={css.wrapper}>
      <PetBlock
        srcMob="/icons/bg-add-pet-mob.svg"
        srcTab="/icons/bg-add-pet-tabl.svg"
        srcDesk="/icons/bg-add-pet-desk.svg"
      />
      <AddPetForm />
    </div>
  );
}
