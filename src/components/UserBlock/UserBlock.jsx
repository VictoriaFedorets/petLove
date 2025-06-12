import css from "./UserBlock.module.css";
import { useDispatch, useSelector } from "react-redux";
import { uploadToCloudinary } from "../../services/cloudinary.js";
import { updateUser } from "../../redux/user/userOperations.js";
import { toast } from "react-toastify";
import {
  selectUser,
  selectUserAvatar,
} from "../../redux/user/userSelectors.js";
import { useRef, useState } from "react";

export default function UserBlock() {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef();

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const avatar = useSelector(selectUserAvatar);
  if (!user) {
    return <p>Loading user info...</p>;
  }

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

  return (
    <>
      <span className={css.user}>
        {user?.name}
        <svg className={css.iconUser}>
          <use width="18" height="18" href="#icon-user"></use>
        </svg>
      </span>

      {/* прихований інпут для завантаження файлу */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      {!avatar ? (
        <div className={css.blockPhoto}>
          <svg className={css.iconUserPhoto}>
            <use width="40" height="40" href="#icon-user"></use>
          </svg>
          <a onClick={handleUploadClick} className={css.upload} href="#">
            {isUploading ? "Uploading..." : "Upload photo"}
          </a>
        </div>
      ) : (
        <img
          onClick={handleUploadClick}
          className={css.userPhoto}
          src={avatar}
          alt="User photo"
        />
      )}

      <h1 className={css.title}>My information</h1>

      <div className={css.userInfo}>
        <input
          className={user?.name ? css.filledInput : css.emptyInput}
          type="text"
          value={user?.name || ""}
          disabled
        />

        <input
          className={user?.name ? css.filledInput : css.emptyInput}
          type="text"
          value={user?.email || ""}
          disabled
        />

        <input
          className={user?.name ? css.filledInput : css.emptyInput}
          type="text"
          value={user?.phone || ""}
          disabled
          placeholder="+380"
        />
      </div>
    </>
  );
}
