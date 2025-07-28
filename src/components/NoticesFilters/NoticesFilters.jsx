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
  getNotices,
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
import { setFilters, setNoticesPage } from "../../redux/notices/noticesSlice";

export default function NoticesFilters() {
  const dispatch = useDispatch();
  const categories = useSelector(selectNoticesCategories);
  const genders = useSelector(selectNoticesGenders);
  const species = useSelector(selectNoticesSpecies);
  const locations = useSelector(selectLocations);
  const { filters, page, perPage } = useSelector((state) => state.notices);

  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");

  const { control, register, reset } = useForm({
    defaultValues: {
      title: "",
      category: "",
      sex: "",
      species: "",
      location: "",
      sort: "",
    },
  });

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

  const handlePageChange = (newPage) => {
    dispatch(setNoticesPage(newPage));
    // dispatch(getNotices({ ...filters, page: newPage, perPage }));
  };

  return (
    <form className={css.filter}>
      <SearchField
        name="title"
        placeholder="Search"
        icon="search"
        register={register}
      />

      <div className={css.selectRow}>
        <CustomSelect
          name="category"
          options={categories}
          placeholder="Category"
          control={control}
        />
        <CustomSelect
          name="sex"
          options={genders}
          placeholder="By gender"
          control={control}
        />
      </div>

      <CustomSelect
        name="species"
        options={species}
        placeholder="By type"
        control={control}
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

      <div className={css.radioGroup}>
        <label>
          <input type="radio" value="byPopularity_true" {...register("sort")} />
          Popular
        </label>
        <label>
          <input
            type="radio"
            value="byPopularity_false"
            {...register("sort")}
          />
          Unpopular
        </label>
        <label>
          <input type="radio" value="byPrice_true" {...register("sort")} />
          Cheap
        </label>
        <label>
          <input type="radio" value="byPrice_false" {...register("sort")} />
          Expensive
        </label>
      </div>

      <button
        className={css.resetBtn}
        type="button"
        onClick={() => {
          reset();
          dispatch(setFilters({}));
          dispatch(setNoticesPage(1));
        }}
      >
        Reset
      </button>
      <AutoSubmit control={control} />
    </form>
  );
}
