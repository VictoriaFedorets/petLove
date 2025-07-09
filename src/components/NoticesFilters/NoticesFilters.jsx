import clsx from "clsx";
import css from "./NoticesFilters.module.css";
import { Formik, Form, Field, useFormikContext } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  selectLocations,
  selectNoticesCategories,
  selectNoticesGenders,
  selectNoticesSpecies,
} from "../../redux/notices/noticesSelectors";
import { useCallback, useEffect, useState } from "react";
import {
  getNotices,
  getNoticesCategories,
  getNoticesGenders,
  getNoticesLocations,
  getNoticesSpecies,
} from "../../redux/notices/noticesOperations";
import AsyncSelect from "react-select/async";
import { CustomClearIndicator } from "../CustomComponents/CustomClearIndicator";
import { CustomOption } from "../CustomComponents/CustomOption"; // твой кастомный Option
import { components } from "react-select";
import SearchField from "../SearchField/SearchField";
import { loadCitiesOptions } from "../CustomComponents/LoadCitiesOptions"; // Импорт функции загрузки

export default function NoticesFilters() {
  const dispatch = useDispatch();
  const categories = useSelector(selectNoticesCategories);
  const genders = useSelector(selectNoticesGenders);
  const species = useSelector(selectNoticesSpecies);
  const locations = useSelector(selectLocations);

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

  //   const loadOptions = useCallback(
  //     (inputValue) => loadCitiesOptions(dispatch, selectedRegion)(inputValue),
  //     [dispatch, selectedRegion]
  //   );

  const SearchIcon = (props) => (
    <components.DropdownIndicator {...props}>
      <svg className={css.icons}>
        <use href="#icon-search" />
      </svg>
    </components.DropdownIndicator>
  );

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
            <label className={css.inputWrapper}>
              <Field
                as="select"
                name="category"
                className={clsx(css.search, css.twistField)}
              >
                <option value="">Category</option>
                <option value="all">Show all</option>
                {categories?.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Field>
              <svg className={css.icons}>
                <use href="#icon-chevron-down"></use>
              </svg>
            </label>

            <label className={css.inputWrapper}>
              <Field
                as="select"
                name="sex"
                className={clsx(css.search, css.twistField)}
              >
                <option value="">By gender</option>
                <option value="all">Show all</option>
                {genders?.map((gender) => (
                  <option key={gender} value={gender}>
                    {gender}
                  </option>
                ))}
              </Field>
              <svg className={css.icons}>
                <use href="#icon-chevron-down"></use>
              </svg>
            </label>
          </div>

          <label className={css.inputWrapper}>
            <Field as="select" name="species" className={css.search}>
              <option value="">By type</option>
              <option value="all">Show all</option>
              {species?.map((specie) => (
                <option key={specie} value={specie}>
                  {specie}
                </option>
              ))}
            </Field>
            <svg className={css.icons}>
              <use href="#icon-chevron-down"></use>
            </svg>
          </label>

          <div className={css.inputWrapper}>
            <AsyncSelect
              cacheOptions
              defaultOptions={false}
              loadOptions={loadOptions}
              onChange={(option) =>
                setFieldValue("location", option?.value || "")
              }
              placeholder="Location"
              classNamePrefix="react-select"
              className={css.select}
              noOptionsMessage={({ inputValue }) =>
                inputValue.length < 3 ? null : "No cities found"
              }
              components={{
                ClearIndicator: CustomClearIndicator,
                DropdownIndicator: SearchIcon,
                IndicatorSeparator: () => null,
                Option: CustomOption,
              }}
              isClearable
              styles={{
                control: (provided) => ({
                  ...provided,
                  border: "none",
                  borderRadius: "30px",
                  backgroundColor: "#fff",
                  paddingLeft: "12px",
                  paddingRight: "30px",
                  height: "42px",
                  minHeight: "unset",
                  fontFamily: "var(--font-family)",
                  fontWeight: 500,
                  fontSize: "14px",
                  color: "#262626",
                  boxShadow: "none",
                }),
                input: (provided) => ({
                  ...provided,
                  margin: 0,
                  padding: 0,
                  color: "#262626",
                }),
                placeholder: (provided) => ({
                  ...provided,
                  color: "#262626",
                  fontWeight: 500,
                }),
                singleValue: (provided) => ({
                  ...provided,
                  color: "#262626",
                  fontWeight: 500,
                }),
                menu: (provided) => ({
                  ...provided,
                  borderRadius: "15px",
                  width: "295px",
                  height: "94px",
                  background: "#fff",
                  zIndex: 100,
                }),
                menuList: (provided) => ({
                  ...provided,
                  borderRadius: "15px",
                  padding: "12px",
                  width: "295px",
                  height: "94px",
                  zIndex: 100,
                }),
                valueContainer: (provided) => ({
                  ...provided,
                  padding: "0",
                }),
                clearIndicator: (provided) => ({
                  ...provided,
                  padding: "0",
                  color: "#262626",
                }),
                dropdownIndicator: (provided) => ({
                  ...provided,
                  padding: "4px",
                }),
              }}
            />
          </div>

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
