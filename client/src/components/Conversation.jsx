import styles from "./Conversation.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Conversation = (props) => {
  const [friend, setFriend] = useState(null);
  const [firstLetter, setFirstLetter] = useState(null);
  const user = useSelector((state) => state.user);
  var friendId=""
  useEffect(() => {
    friendId = props.conversation.members.find((m) => m !== user._id);
    console.log("frID", friendId)
    console.log("conv", props.conversation.members)
    console.log("myID", user._id)

    getFriend();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
  console.log(friendId)
  const getFriend = async () => {
    const response = await fetch(`http://localhost:3001/users/${friendId}`, {
      method: "GET",
    });

    const data = await response.json();
    console.log(data)
    setFriend(data);
    setFirstLetter(friend?.firstName[0]);
  };

  return <>

<div className={styles.conversation}>
      <div
        className={styles.conversationIcon}>{firstLetter?.toUpperCase()}</div>
      <span className={styles.conversationName}>{friend?.firstName}</span>
    </div>
  </>
};

export default Conversation;