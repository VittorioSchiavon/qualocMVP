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
  const navigate = useNavigate();

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

  };

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    divRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [messages]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await fetch(`http://localhost:3001/messages/${currentChat?._id}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setMessages(data);
      } catch (err) {
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
  };



  return (
    <>
      <div className={styles.container}>
      <div className={styles.list}>
        <button onClick={()=>{navigate("/")}} >homepage</button>
        <div className={styles.listTitle}>Chat</div>
      {conversations!=null && conversations.map((el)=>(
        <div onClick={() => {
        setCurrentChat(el)
        }}>
            <Conversation conversation={el} isActive={el==currentChat}/>
            
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
          <button type="submit" class={styles.sendMessageButton} onClick={handleSubmit}>
          <svg 
          viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12.815 12.197-7.532 1.256a.5.5 0 0 0-.386.318L2.3 20.728c-.248.64.421 1.25 1.035.943l18-9a.75.75 0 0 0 0-1.342l-18-9c-.614-.307-1.283.304-1.035.943l2.598 6.957a.5.5 0 0 0 .386.319l7.532 1.255a.2.2 0 0 1 0 .394Z"/></svg>
          </button>
        </form>
      </div>
      ):(
      <div className={styles.noConversationText}>
      Seleziona una conversazione
    </div>
      )}
      </div>

    </>
  );
};

export default ChatPage;
