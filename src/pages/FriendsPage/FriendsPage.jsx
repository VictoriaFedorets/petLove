import Title from "../../components/Title/Title";
import FriendsList from "../../components/FriendsList/FriendsList.jsx";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
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
