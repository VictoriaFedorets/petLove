export const DATE_FORMAT_DDMMYYYY = "dd.MM.yyyy";

export const getUniqueById = (arr) =>
  arr.filter(
    (item, index, self) => index === self.findIndex((n) => n._id === item._id)
  );
