import styles from "./SendMessage.module.css";
import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SendMessage = ({ store }) => {
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const [content, setContent] = useState("");
  const [sent, setSent] = useState(false);
  const [close, setClose] = useState(false);


  const handleSubmit = async (event) => {
    event.preventDefault();

    const message = {
      senderID: user._id,
      text: content,
      receiverID: store.ownerID,
    }
    const savedMessagetResponse = await fetch(
      "http://localhost:3001/messages/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(message),
      }

    );
    const savedMessage = await savedMessagetResponse.json();
    if (savedMessagetResponse.status === 200) {
      console.log("hi")
    setSent(true) }


  };

  return (
    <>
    {!close &&
      <div className={styles.container}>
              <button  className={styles.closeButton} onClick={()=>{setClose(true)}}>x</button>

      <div className={styles.title}>Contatta "{store.name}"</div>
      {sent?
        (<div  className={styles.messageSent}>Messaggio inviato!</div>)
        :<>

        <div className={styles.userData}>
          {user?.picturePath ? (
            <img
              src={"http://localhost:3001/assets/" + user?.picturePath}
              alt=""
              className={styles.userImage}
            />
          ) : (
            <svg
              className={styles.userIcon}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M18,19H6V17.6C6,15.6 10,14.5 12,14.5C14,14.5 18,15.6 18,17.6M12,7A3,3 0 0,1 15,10A3,3 0 0,1 12,13A3,3 0 0,1 9,10A3,3 0 0,1 12,7M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3Z" />
            </svg>
          )}
          <div className={styles.userName}>{user?.firstName}</div>
        </div>
         
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
          type="text"
            id={styles.content}
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
            placeholder="Scrivi il messaggio"
          />
          <button type="submit" className={styles.submitButton}>
          <svg width="24" height="24" className={styles.sendIcon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12.815 12.197-7.532 1.256a.5.5 0 0 0-.386.318L2.3 20.728c-.248.64.421 1.25 1.035.943l18-9a.75.75 0 0 0 0-1.342l-18-9c-.614-.307-1.283.304-1.035.943l2.598 6.957a.5.5 0 0 0 .386.319l7.532 1.255a.2.2 0 0 1 0 .394Z" /></svg>

          </button>
        </form>
        </>
}
      </div>
}
    </>
  );
};

export default SendMessage;
