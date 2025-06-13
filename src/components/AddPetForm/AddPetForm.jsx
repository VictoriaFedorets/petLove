import css from "./AddPetForm.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addPets } from "../../redux/user/userOperations";
import { selectPets } from "../../redux/user/userSelectors";
import { toast } from "react-toastify";
import { useEffect, useMemo, useRef, useState } from "react";
import { uploadToCloudinary } from "../../services/cloudinary.js";
import { Link } from "react-router-dom";
import { selectNoticesSpacies } from "../../redux/notices/noticesSelectors.js";

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

export default function AddPetForm() {
  const dispatch = useDispatch();
  const pet = useSelector(selectPets);
  console.log(pet);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
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

  useEffect(() => {
    if (pet?.imgURL) {
      setValue("avatar", pet.imgURL);
    }
  }, [pet?.imgURL, setValue]);

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
      await dispatch(addPets(data)).unwrap();
      toast.success("Pet added successfully");
    } catch (error) {
      toast.error(error || "Failed to add pet");
    }
  };

  const notices = useSelector(selectNoticesSpacies);

  const getUniqueValues = (data, key) => {
    return [...new Set(data.flatMap((item) => item[key]))];
  };
  //   const fullState = useSelector((state) => state);
  //   console.log(fullState); весь стейт

  const uniqueSpecies = useMemo(() => [...new Set(notices)], [notices]);
  console.log("All notices", notices);
  console.log("Unique species", uniqueSpecies);

  //   const uniqueSpecies = useMemo(
  //     () => getUniqueValues(notices, "species"),
  //     [notices]
  //   );

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
              <use width="34" height="34" href="#icon-cat-footprint"></use>
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
            className={`${css.input} ${css.upload} ${css.inputUrl}`}
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
          className={`${css.input} ${css.upload}`}
          type="text"
          placeholder="Title"
          {...register("title")}
        />
        {errors.title && <p className={css.error}>{errors.title.message}</p>}

        <input
          className={`${css.input} ${css.upload}`}
          type="text"
          placeholder="Pet's Name"
          {...register("name")}
        />
        {errors.name && <p className={css.error}>{errors.name.message}</p>}

        <div className={css.blockDateType}>
          <input
            className={`${css.input} ${css.upload}`}
            type="text"
            placeholder="00.00.0000"
            {...register("birthday")}
          />
          {errors.birthday && (
            <p className={css.error}>{errors.birthday.message}</p>
          )}

          <select
            className={`${css.input} ${css.upload}`}
            {...register("species")}
            defaultValue=""
          >
            <option value="" disabled>
              Type of pet
            </option>
            {uniqueSpecies.map((species) => (
              <option key={species} value={species}>
                {species}
              </option>
            ))}
            <option value="parrot">Parrot</option>
            <option value="hamster">Hamster</option>
            <option value="rabbit">Rabbit</option>
            <option value="other">Other</option>
          </select>
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
