import Title from "../../components/Title/Title";
import FriendsList from "../../components/FriendsList/FriendsList.jsx";
// import css from "./FriendsPage.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFriends } from "../../redux/friends/friendsOperations.js";

export default function FriendsPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFriends());
  }, [dispatch]);

  return (
    <>
      <Title>Our friends</Title>
      <FriendsList />
    </>
  );
}
