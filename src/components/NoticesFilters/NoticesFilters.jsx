import css from "./NoticesFilters.module.css";
import { Formik, Form, Field, useFormikContext } from "formik";
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
import { selectNotices } from "../../redux/notices/noticesSelectors";

export default function NoticesFilters() {
  const dispatch = useDispatch();
  const categories = useSelector(selectNoticesCategories);
  const genders = useSelector(selectNoticesGenders);
  const species = useSelector(selectNoticesSpecies);
  const locations = useSelector(selectLocations);
  const notices = useSelector(selectNotices);
  console.log(notices);

  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");

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

  const AutoSubmit = () => {
    const { values } = useFormikContext();

    const mappedValues = {
      ...(values.title && { keyword: values.title }),
      ...(values.category &&
        values.category !== "all" && { category: values.category }),
      ...(values.sex && values.sex !== "all" && { sex: values.sex }),
      ...(values.species &&
        values.species !== "all" && { species: values.species }),
      ...(values.location && { locationId: values.location }),
      ...(values.sort && { sort: values.sort }),
    };

    useEffect(() => {
      dispatch(getNotices(mappedValues));
    }, [values, dispatch]);

    return null;
  };

  return (
    <Formik
      initialValues={{
        title: "",
        category: "",
        sex: "",
        species: "",
        location: "",
        sort: "",
      }}
      onSubmit={() => {}}
    >
      {({ setFieldValue, resetForm }) => (
        <Form className={css.filter}>
          <AutoSubmit />
          <SearchField name="title" placeholder="Search" icon="search" />

          <div className={css.selectRow}>
            <CustomSelect
              name="category"
              options={categories}
              placeholder="Category"
            />
            <CustomSelect
              name="sex"
              options={genders}
              placeholder="By gender"
            />
          </div>

          <CustomSelect
            name="species"
            options={species}
            placeholder="By type"
          />

          <AsyncLocationSelect
            loadOptions={loadOptions}
            onChange={(value) => setFieldValue("location", value)}
            className={css.select}
          />

          <div className={css.radioGroup}>
            <label>
              <Field type="radio" name="sort" value="popular" /> Popular
            </label>
            <label>
              <Field type="radio" name="sort" value="unpopular" /> Unpopular
            </label>
            <label>
              <Field type="radio" name="sort" value="price_asc" /> Cheap
            </label>
            <label>
              <Field type="radio" name="sort" value="price_desc" /> Expensive
            </label>
          </div>

          <button
            className={css.resetBtn}
            type="button"
            onClick={() => resetForm()}
          >
            Reset
          </button>
        </Form>
      )}
    </Formik>
  );
}
