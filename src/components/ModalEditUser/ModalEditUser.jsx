import css from "./ModalEditUser.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/user/userOperations";
import { selectUser } from "../../redux/user/userSelectors";
import { toast } from "react-toastify";
import BaseModal from "../BaseModal/BaseModal";
import { useEffect, useRef, useState } from "react";
import { uploadToCloudinary } from "../../services/cloudinary.js";

const schema = yup.object().shape({
  avatar: yup
    .string()
    .matches(
      /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/,
      "Incorrect image link"
    )
    .required("Avatar is required"),
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .matches(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, "Invalid email")
    .required("Email is required"),
  phone: yup
    .string()
    .matches(/^\+380\d{9}$/, "The number must be in the format +380XXXXXXXXX")
    .required("Required field"),
});

export default function ModalEditUser({ onClose }) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      avatar: user?.avatar || "",
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "+380",
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (user?.avatar) {
      setValue("avatar", user.avatar);
    }
  }, [user?.avatar, setValue]);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploading(true);

    try {
      const avatarUrl = await uploadToCloudinary(file);
      await dispatch(updateUser({ avatar: avatarUrl })).unwrap();
      toast.success("Avatar updated successfully");
    } catch (error) {
      toast.error("Failed to upload avatar");
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      await dispatch(updateUser(data)).unwrap();
      toast.success("Profile updated");
      onClose();
    } catch (error) {
      toast.error(error || "Failed to update profile");
    }
  };

  return (
    <BaseModal onClose={onClose} className={css.modalEdit}>
      <h2 className={css.title}>Edit information</h2>

      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        {/* Прихований input для вибору файлу */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        {!user.avatar ? (
          <div className={css.blockPhoto}>
            <svg className={css.iconUserPhoto}>
              <use width="40" height="40" href="#icon-user"></use>
            </svg>
          </div>
        ) : (
          <img
            onClick={handleUploadClick}
            className={css.userPhoto}
            src={user.avatar}
            alt="User photo"
          />
        )}

        <label className={css.avatarBlock}>
          <input
            className={`${css.input} ${css.upload}`}
            type="text"
            {...register("avatar")}
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

          {errors.avatar && (
            <p className={css.error}>{errors.avatar.message}</p>
          )}
        </label>

        <input className={css.input} type="text" {...register("name")} />
        {errors.name && <p className={css.error}>{errors.name.message}</p>}

        <input className={css.input} type="email" {...register("email")} />
        {errors.email && <p className={css.error}>{errors.email.message}</p>}

        <input
          className={css.input}
          type="tel"
          placeholder="XXXXXXXXX"
          {...register("phone")}
        />
        {errors.phone && <p className={css.error}>{errors.phone.message}</p>}

        <button className={css.saveBtn} type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Go to profile"}
        </button>
      </form>
    </BaseModal>
  );
}
