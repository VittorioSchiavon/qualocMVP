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
    getFriend();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
  const getFriend = async () => {
    const response = await fetch(`http://localhost:3001/users/${friendId}`, {
      method: "GET",
    });

    const data = await response.json();
    setFriend(data);
    setFirstLetter(friend?.firstName[0]);
  };

  return <>

<div className={styles.conversation} style={ props.isActive ? { backgroundColor:'var(--white)'}: {}}>
      

{friend?.picturePath ? (
              <img
                src={"http://localhost:3001/assets/" + friend?.picturePath}
                alt=""
                className={styles.conversationIcon}
              />
            ) : (
<div
        className={styles.conversationIcon}>j</div>
            )}
      <span className={styles.conversationName}>{friend?.firstName+" "+ friend?.lastName}</span>
    </div>
  </>
};

export default Conversation;