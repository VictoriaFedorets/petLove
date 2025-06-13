import PetBlock from "../../components/PetBlock/PetBlock";
import AddPetForm from "../../components/AddPetForm/AddPetForm";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getNotices } from "../../redux/notices/noticesOperations";

export default function AddPetPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotices()); // завантаження нотісів при відкритті сторінки
  }, [dispatch]);

  return (
    <>
      <PetBlock />
      <AddPetForm />
    </>
  );
}
