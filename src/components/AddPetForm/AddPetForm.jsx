import css from "./AddPetForm.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Select from "react-select";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addPet } from "../../redux/user/userOperations";
import { selectPets } from "../../redux/user/userSelectors";
import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import { uploadToCloudinary } from "../../services/cloudinary.js";
import { Link, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

import { Controller } from "react-hook-form";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  name: yup.string().required("Name is required"),
  imgURL: yup
    .string()
    .matches(
      /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/,
      "Incorrect image link"
    )
    .required("Avatar is required"),
  species: yup.string().required("Species is recuired"),
  birthday: yup
    .string()
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Invalid birthday")
    .required("Birthday is required"),
  sex: yup.string().required("Sex is required"),
});

export default function AddPetForm({ species }) {
  const dispatch = useDispatch();
  const pet = useSelector(selectPets);
  const [isUploading, setIsUploading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const fileInputRef = useRef();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: pet?.name || "",
      imgURL: pet?.imgURL || "",
      title: pet?.title || "",
      species: pet?.species || "",
      birthday: pet?.birthday || "",
      sex: pet?.sex || "",
    },
    resolver: yupResolver(schema),
  });

  const imgURL = watch("imgURL");
  const navigate = useNavigate();

  const [selectHeight, setSelectHeight] = useState(
    window.innerWidth >= 768 ? 52 : 42
  );
  const [selectPadding, setSelectPadding] = useState(
    window.innerWidth >= 768 ? 16 : 12
  );

  useEffect(() => {
    const handleResize = () => {
      const isTablet = window.innerWidth >= 768;
      setSelectHeight(isTablet ? 56 : 42);
      setSelectPadding(isTablet ? 16 : 12);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploading(true);

    try {
      const avatarUrl = await uploadToCloudinary(file);
      setValue("imgURL", avatarUrl);
      toast.success("Photo uploaded");
    } catch (error) {
      toast.error("Failed to upload photo");
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      await dispatch(addPet(data)).unwrap();
      toast.success("Pet added successfully");
      navigate("/profile");
    } catch (error) {
      const errorMessage =
        (error && error.message) ||
        (typeof error === "string" && error) ||
        "Failed to add pet";

      toast.error(errorMessage);
    }
  };

  const speciesOptions = species.map((s) => ({
    value: s,
    label: s.charAt(0).toUpperCase() + s.slice(1),
  }));

  // const notices = useSelector(selectNoticesSpacies);
  // console.log(notices);
  // const getUniqueValues = (data, key) => {
  //   return [...new Set(data.flatMap((item) => item[key]))];
  // };
  // const uniqueSpecies = useMemo(() => [...new Set(notices)], [notices]);

  // const speciesOptions = uniqueSpecies.map((s) => ({
  //   value: s,
  //   label: s.charAt(0).toUpperCase() + s.slice(1),
  // }));

  // const speciesOptions = [
  //   ...uniqueSpecies.map((s) => ({ value: s, label: s })),
  //   { value: "parrot", label: "Parrot" },
  //   { value: "hamster", label: "Hamster" },
  //   { value: "rabbit", label: "Rabbit" },
  //   { value: "snake", label: "Snake" },
  //   { value: "turtle", label: "Turtle" },
  //   { value: "lizard", label: "Lizard" },
  //   { value: "frog", label: "Frog" },
  //   { value: "fish", label: "Fish" },
  //   { value: "bees", label: "Bees" },
  //   { value: "butterfly", label: "Butterfly" },
  //   { value: "spider", label: "Spider" },
  //   { value: "scorpion", label: "Scorpion" },
  //   { value: "other", label: "Other" },
  // ];

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    return `${day}.${month}.${year}`;
  };
  useEffect(() => {
    const hideDatepickerTabLoops = () => {
      const start = document.querySelector(
        ".react-datepicker__tab-loop__start"
      );
      const end = document.querySelector(".react-datepicker__tab-loop__end");

      if (start) start.style.display = "none";
      if (end) end.style.display = "none";
    };

    // Випадок: відкриваєш календар
    document.addEventListener("mousedown", hideDatepickerTabLoops);
    document.addEventListener("focusin", hideDatepickerTabLoops);

    // При розмонтуванні
    return () => {
      document.removeEventListener("mousedown", hideDatepickerTabLoops);
      document.removeEventListener("focusin", hideDatepickerTabLoops);
    };
  }, []);
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
    .react-datepicker__tab-loop__start,
    .react-datepicker__tab-loop__end {
      display: none !important;
    }
  `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className={css.wrapperAddPet}>
      <span className={css.title}>Add my pet /</span>
      <span className={css.titleDet}>Personal details</span>

      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        <div className={css.svgBlock}>
          <label>
            <input
              type="radio"
              name="sex"
              value="female"
              {...register("sex")}
              className={css.radioInput}
            />
            <svg className={css.iconFemale}>
              <use href="#icon-female-gender"></use>
            </svg>
          </label>

          <label>
            <input
              type="radio"
              name="sex"
              value="male"
              {...register("sex")}
              className={css.radioInput}
            />
            <svg className={css.iconMale}>
              <use href="#icon-male-gender"></use>
            </svg>
          </label>

          <label>
            <input
              type="radio"
              name="sex"
              value="multiple"
              {...register("sex")}
              className={css.radioInput}
            />
            <svg className={css.iconMultiple}>
              <use href="#icon-multiple-gender"></use>
            </svg>
          </label>
        </div>
        {/* Прихований input для вибору файлу */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />

        <div className={css.blockPhoto}>
          {!imgURL ? (
            <svg className={css.iconUserPhoto}>
              <use href="#icon-cat-footprint"></use>
            </svg>
          ) : (
            <img
              onClick={handleUploadClick}
              className={css.userPhoto}
              src={imgURL}
              alt="Pet photo"
            />
          )}
        </div>

        <label className={css.avatarBlock}>
          <input
            className={`${css.input} ${css.inputUrl}`}
            type="text"
            placeholder="Enter URL"
            {...register("imgURL")}
          />
          <button
            type="button"
            onClick={handleUploadClick}
            className={css.btnUpload}
          >
            {isUploading ? "Uploading..." : "Upload photo"}
            <svg className={css.iconUpload}>
              <use href="#icon-upload-cloud"></use>
            </svg>
          </button>

          {errors.imgURL && (
            <p className={css.error}>{errors.imgURL.message}</p>
          )}
        </label>

        <input
          className={css.input}
          type="text"
          placeholder="Title"
          {...register("title")}
        />
        {errors.title && <p className={css.error}>{errors.title.message}</p>}

        <input
          className={css.input}
          type="text"
          placeholder="Pet's Name"
          {...register("name")}
        />
        {errors.name && <p className={css.error}>{errors.name.message}</p>}

        <div className={css.blockDateType}>
          <Controller
            control={control}
            name="birthday"
            render={({ field }) => (
              <DatePicker
                dateFormat="dd.MM.yyyy"
                placeholderText="00.00.0000"
                selected={field.value ? new Date(field.value) : null}
                onChange={(date) =>
                  field.onChange(date ? format(date, "yyyy-MM-dd") : "")
                }
                maxDate={new Date()}
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={100}
                popperPlacement="bottom-start"
                customInput={
                  <div
                    className={`${css.input} ${css.inputDate}`}
                    onClick={field.onBlur}
                  >
                    <input
                      className={css.date}
                      type="text"
                      value={
                        field.value
                          ? format(new Date(field.value), "dd.MM.yyyy")
                          : ""
                      }
                      onChange={() => {}}
                      readOnly
                      placeholder="00.00.0000"
                    />
                    <svg className={css.iconCalendar}>
                      <use href="#icon-calendar"></use>
                    </svg>
                  </div>
                }
              />
            )}
          />
          {errors.birthday && (
            <p className={css.error}>{errors.birthday.message}</p>
          )}

          <Controller
            name="species"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                value={speciesOptions.find((opt) => opt.value === field.value)} // шукаємо об'єкт по значенню
                onChange={(selectedOption) =>
                  field.onChange(selectedOption.value)
                } // передаємо лише рядок
                options={speciesOptions}
                placeholder="Type of pet"
                isSearchable={false}
                classNamePrefix="custom-select"
                menuPortalTarget={null}
                menuPosition="absolute"
                menuPlacement="auto"
                maxMenuHeight={78}
                styles={{
                  dropdownIndicator: (base, state) => ({
                    ...base,
                    padding: 0,
                    transition: "transform 0.3s ease",
                    transform: state.selectProps.menuIsOpen
                      ? "rotate(180deg)"
                      : null,
                    strokeWidth: "2px",
                    color: "#262626",
                  }),
                  indicatorSeparator: () => ({ display: "none" }),
                  container: (provided) => ({
                    ...provided,
                    flex: "1",
                  }),
                  control: (provided) => ({
                    ...provided,
                    minWidth: "143px",
                    marginLeft: "8px",
                    borderRadius: "30px",
                    padding: `0 ${selectPadding}px`,
                    height: `${selectHeight}px`,
                    minHeight: `${selectHeight}px`,
                    boxShadow: "none",
                    border: "1px solid rgba(38, 38, 38, 0.15)",
                  }),
                  valueContainer: (base) => ({
                    ...base,
                    height: `${selectHeight}px`,
                    padding: "0",
                    display: "flex",
                    alignItems: "center",
                  }),
                  singleValue: (base) => ({
                    ...base,
                    display: "flex",
                    alignItems: "center",
                  }),
                  placeholder: (base) => ({
                    ...base,
                    margin: 0,
                    padding: 0,
                    display: "flex",
                    alignItems: "center",
                  }),
                  indicatorsContainer: (base) => ({
                    ...base,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 0,
                  }),
                  menu: (base) => ({
                    ...base,
                    maxHeight: "78px",
                    overflowY: "auto",
                    borderRadius: "15px",
                    marginTop: "-10px",
                    marginBottom: "0px",
                    zIndex: 1000,
                  }),
                  menuList: (base) => ({
                    ...base,
                    overflowY: "auto",
                    maxHeight: "78px",
                  }),
                }}
              />
            )}
          />
          {errors.species && (
            <p className={css.error}>{errors.species.message}</p>
          )}
        </div>

        <div className={css.btnBlock}>
          <Link className={`${css.btnBack} ${css.btn}`} to="/profile">
            Back
          </Link>
          <button
            className={`${css.btnSave} ${css.btn}`}
            type="submit"
            disabled={isSubmitting}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
