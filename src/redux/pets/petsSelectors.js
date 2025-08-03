export const selectUserPets = (state) => state.userPets.pets;

export const selectUserPetsIsLoading = (state) => state.userPets.isLoading;

export const selectUserPetsError = (state) => state.userPets.error;

export const selectUserPetById = (petId) => (state) =>
  state.userPets.pets.find((pet) => pet._id === petId);
