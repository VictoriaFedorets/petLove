import { useState } from "react";
import css from "./UserBlock.module.css";
import {
  selectUser,
  selectUserAvatar,
} from "../../redux/user/userSelectors.js";
import { useSelector } from "react-redux";

export default function UserBlock() {
  const user = useSelector(selectUser);
  const avatar = useSelector(selectUserAvatar);
  console.log(user);

  const handleAploudClick = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <span className={css.user}>
        {user?.name}
        <svg className={css.iconUser}>
          <use href="#icon-user"></use>
        </svg>
      </span>

      {!avatar ? (
        <div className={css.iconUserPhoto}>
          <svg>
            <use width="40" height="40" href="#icon-user"></use>
          </svg>
        </div>
      ) : (
        <img className={css.userPhoto} src={avatar} alt="User photo" />
      )}
      <a onClick={handleAploudClick} className={css.upload} href="#">
        Upload photo
      </a>

      <h1>My information</h1>

      <div className={css.userInfo}>
        <input type="text" value={user?.name || ""} disabled />

        <input type="text" value={user?.email || ""} disabled />

        <input type="text" value={user?.phone || ""} disabled />
      </div>
    </>
  );
}
