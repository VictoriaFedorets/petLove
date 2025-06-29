import css from "./PetsBlock.module.css";
import AddPet from "../AddPet/AddPet";
import PetsList from "../PetsList/PetsList";

export default function PetsBlock() {
  return (
    <>
      <AddPet />
      <PetsList />
    </>
  );
}
