import { useRef, useState } from "react";
import css from "./UserBlock.module.css";
import { selectUser, selectUserAvatar } from "../../redux/user/userSelectors";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/user/userOperations";
import { uploadToCloudinary } from "../../services/cloudinary";
import { toast } from "react-toastify";

export default function UserBlock() {
  const user = useSelector(selectUser);
  const avatar = useSelector(selectUserAvatar);
  const [isUploading, setIsUploading] = useState(false);
  //   console.log(user);

  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const handleUploadClick = async (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploading(true);

    try {
      const avatarUrl = await uploadToCloudinary(file);

      const updatedData = { avatar: avatarUrl };

      dispatch(updateUser(updatedData)).unwrap();
      toast.success("Avatar updated successfully");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload avatar");
    } finally {
      setIsUploading(false);
    }
  };

  if (!user) {
    return <p>Loading user info...</p>;
  }

  return (
    <>
      <span className={css.user}>
        {user?.name}
        <svg className={css.iconUser}>
          <use href="#icon-user"></use>
        </svg>
      </span>

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

      {/* Прихований input для вибору файлу */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      <h1 className={css.title}>My information</h1>

      <div className={css.userInfo}>
        <input type="text" value={user?.name || ""} disabled />

        <input type="text" value={user?.email || ""} disabled />

        <input
          type="text"
          value={user?.phone || ""}
          disabled
          placeholder="+380"
        />
      </div>
    </>
  );
}
