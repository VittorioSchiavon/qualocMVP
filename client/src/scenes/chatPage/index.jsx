import Navbar from "components/Navbar";
import Footer from "components/Footer";
import styles from "./chatPage.module.css";
import { useEffect, useState, useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "state";
import { useNavigate } from "react-router-dom";
import Conversation from "components/Conversation";
import Message from "components/Message";

const ChatPage = () => {


  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const divRef = useRef(null);
  useEffect(() => {
    getConversations();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getConversations = async () => {
    const response = await fetch(`http://localhost:3001/conversations/`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setConversations(data);
    console.log("convs", data)

  };
  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await fetch(`http://localhost:3001/messages/${currentChat?._id}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        console.log(data)
        setMessages(data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
    divRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentChat]);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      senderID: user._id,
      text: newMessage,
      conversationID: currentChat._id,
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
    setMessages([...messages, savedMessage]);
    setNewMessage("");
    console.log("savedMessaget",savedMessage)
  };



  return (
    <>
      <div className={styles.container}>
      <div className={styles.list}>
      {conversations!=null && conversations.map((el)=>(
        <div onClick={() => {console.log("hi")
        setCurrentChat(el)
        console.log("current", currentChat)}}>
            <Conversation conversation={el} />
            </div>
          ))}
      </div>
      {currentChat ? (

     
      <div className={styles.chat}>
        <div className={styles.mexContainer}>
        {messages.map((m) => (
          <Message message={m} own={m.senderID === user._id}/>
                  ))}
                  <div ref={divRef} />
        </div>
        <form className={styles.newMex}>
          <input type="text" onChange={(e) => setNewMessage(e.target.value)} placeholder="scrivi un messaggio..." value={newMessage}/>
          <button type="submit" class="mainButtonGreen" onClick={handleSubmit}>invia</button>
        </form>
      </div>
      ):(
      <span className="noConversationText">
      Open a conversation to start a chat.
    </span>
      )}
      </div>

    </>
  );
};

export default ChatPage;
