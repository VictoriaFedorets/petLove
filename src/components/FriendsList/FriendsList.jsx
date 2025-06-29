import { useSelector } from "react-redux";
import css from "./FriendsList.module.css";
import { selectFriends } from "../../redux/friends/friendsSelectors";
import FriendsItem from "../FriendsItem/FriendsItem.jsx";

export default function FriendsList() {
  const friendsList = useSelector(selectFriends);
  //   console.log(friendsList);

  if (friendsList.length === 0) {
    return <p>No friends found</p>;
  }

  return (
    <ul className={css.friendsList}>
      {friendsList.map((friend) => (
        <FriendsItem key={friend._id} friend={friend} />
      ))}
    </ul>
  );
}
