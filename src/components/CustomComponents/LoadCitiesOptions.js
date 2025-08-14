import { getCitiesByKeyword } from "../../redux/notices/noticesOperations";

export const loadCitiesOptions =
  (dispatch, selectedRegion) => async (inputValue) => {
    if (inputValue.length < 3) return [];

    const result = await dispatch(getCitiesByKeyword(inputValue));
    const cities = result.payload || [];

    const normalizedInput = inputValue.trim().toLowerCase();

    const filteredCities = (
      selectedRegion
        ? cities.filter((city) => city.stateEn === selectedRegion)
        : cities
    ).filter(
      (city) =>
        city.cityEn.toLowerCase().includes(normalizedInput) ||
        city.stateEn.toLowerCase().includes(normalizedInput)
    );

    const sortedCities = filteredCities.sort((a, b) => {
      const aFull = (a.stateEn + " " + a.cityEn).toLowerCase();
      const bFull = (b.stateEn + " " + b.cityEn).toLowerCase();

      const aStarts = aFull.startsWith(normalizedInput);
      const bStarts = bFull.startsWith(normalizedInput);

      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;

      return aFull.localeCompare(bFull);
    });

    const options = sortedCities.map((city) => ({
      label: `${city.stateEn}, ${city.cityEn}`,
      value: city._id,
    }));

    return options;
  };
