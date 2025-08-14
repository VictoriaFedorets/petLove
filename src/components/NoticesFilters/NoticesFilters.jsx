import css from "./NoticesFilters.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  selectLocations,
  selectNoticesCategories,
  selectNoticesGenders,
  selectNoticesSpecies,
} from "../../redux/notices/noticesSelectors";
import { useEffect, useState } from "react";
import {
  getNoticesCategories,
  getNoticesGenders,
  getNoticesLocations,
  getNoticesSpecies,
} from "../../redux/notices/noticesOperations";
import SearchField from "../SearchField/SearchField";
import { CustomSelect } from "../CustomComponents/CustomSelect";
import { loadCitiesOptions } from "../CustomComponents/LoadCitiesOptions";
import { AsyncLocationSelect } from "../CustomComponents/AsyncLocationSelect";
import { useForm, Controller } from "react-hook-form";
import { AutoSubmit } from "../CustomComponents/AutoSubmit";
import { SortSelector } from "../CustomComponents/SortSelector/SortSelector";
import { useMediaQuery } from "../../hooks/useMediaQuery";

export default function NoticesFilters() {
  const dispatch = useDispatch();
  const categories = useSelector(selectNoticesCategories);
  const genders = useSelector(selectNoticesGenders);
  const species = useSelector(selectNoticesSpecies);
  const locations = useSelector(selectLocations);

  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");

  const { control, register } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      category: "",
      sex: "",
      species: "",
      location: "",
      sort: "",
    },
  });

  const { isTablet, getControlWidth } = useMediaQuery();

  useEffect(() => {
    dispatch(getNoticesCategories());
    dispatch(getNoticesGenders());
    dispatch(getNoticesSpecies());
    dispatch(getNoticesLocations());
  }, [dispatch]);

  useEffect(() => {
    if (locations.length) {
      const uniqueRegions = Array.from(
        new Set(locations.map((c) => c.stateEn))
      ).sort();
      setRegions(uniqueRegions);
    }
  }, [locations]);

  const loadOptions = loadCitiesOptions(dispatch, selectedRegion);

  return (
    <form className={css.filter}>
      <SearchField
        name="title"
        placeholder="Search"
        icon="search"
        register={register}
        className={css.search}
      />

      <div className={css.selectRow}>
        <CustomSelect
          name="category"
          options={categories}
          placeholder="Category"
          control={control}
          controlWidth={getControlWidth("100%", "170px", "200px")}
          containerStyle={{ width: "100%", flex: 1 }}
        />
        <CustomSelect
          name="sex"
          options={genders}
          placeholder="By gender"
          control={control}
          controlWidth={getControlWidth("100%", "170px", "190px")}
          containerStyle={{ width: "100%", flex: 1 }}
        />
      </div>

      <CustomSelect
        name="species"
        options={species}
        placeholder="By type"
        control={control}
        controlWidth={isTablet ? "190px" : "100%"}
      />

      <Controller
        name="location"
        control={control}
        render={({ field }) => (
          <AsyncLocationSelect
            loadOptions={loadOptions}
            onChange={(val) => field.onChange(val)}
            value={field.value}
            className={css.select}
            placeholder="Location"
          />
        )}
      />

      <div className={css.separator}></div>

      <SortSelector control={control} name="sort" />

      <AutoSubmit control={control} />
    </form>
  );
}
