import Navbar from "components/Navbar";
import Footer from "components/Footer";
import styles from "./chatPage.module.css";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "state";
import { useNavigate } from "react-router-dom";
import Conversation from "components/Conversation";
import Message from "components/Message";
import { io } from "socket.io-client";
import Dropzone from "react-dropzone";
//import bellSound from "../assets/bellSound.mp3"
const ChatPage = () => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const navigate = useNavigate();
  const socket = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [hidden, setHidden] = useState(false);
  const [image, setImage] = useState();
  const [showForm, setShowForm] = useState(false);
  const [purchaseProposal, setPurchaseProposal] = useState({
    name: "",
    price: 0,
    shippingCost:0,
  });

  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const divRef = useRef(null);
  useEffect(() => {
    getConversations();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function playSound() {}
  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        type: data?.type,
        createdAt: Date.now(),
      });
    });
    playSound();
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
  }, [user]);

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
    divRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/messages/${currentChat?._id}`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await response.json();
        setMessages(data);
      } catch (err) {}
    };
    getMessages();
    divRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentChat]);

  const submitProposal = async () => {
    const savedProposalResponse = await fetch(
      "http://localhost:3001/products/addTempProduct",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(purchaseProposal),
      }
    );
    const savedProposal = await savedProposalResponse.json();
    return savedProposal._id;
  };

  const submitImage = async () => {
    const formData = new FormData();
    formData.append("picture", image);
    const savedImageResponse = await fetch(
      "http://localhost:3001/messages/uploadImage",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );
    const savedImage = await savedImageResponse.json();
    return savedImage;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    var content=newMessage
    var type=""
    if (image){
      content = await submitImage();
      type="image"
    } 
    if (showForm){
      content=await submitProposal();
      type="product"
    }

    const message = {
      senderID: user._id,
      text: content,
      type: type,
      conversationID: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );
    socket.current.emit("sendMessage", {
      senderID: user._id,
      text: content,
      type: type,
      conversationID: currentChat._id,
    });
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
    setImage("");
    setPurchaseProposal({    name: "",
    price: 0,
    shippingCost:0,})
    setShowForm(false)
  };

  return (
    <div className={styles.totContainer}>
      <div
        className={styles.container}
        style={{ transform: hidden ? "translateX(100%)" : "translateX(200%)" }}
      >
        <button
          className={styles.showButton}
          onClick={() => setHidden(!hidden)}
        >
          <svg
            className={styles.showButtonIcon}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.5 3a7.5 7.5 0 0 0-6.797 10.675 68.094 68.094 0 0 0-.681 3.142.996.996 0 0 0 1.153 1.17c.623-.11 1.978-.36 3.236-.65A7.5 7.5 0 1 0 9.5 3Zm-.038 16a7.473 7.473 0 0 0 5.1 2c1.1 0 2.145-.237 3.088-.663 1.043.244 2.186.488 2.913.64a1.244 1.244 0 0 0 1.467-1.5c-.162-.703-.418-1.795-.671-2.803A7.503 7.503 0 0 0 17.015 6.41a8.44 8.44 0 0 1 .8 2.048 5.995 5.995 0 0 1 2.747 5.042c0 .992-.24 1.925-.665 2.747l-.13.253.07.276c.228.895.467 1.9.642 2.65-.774-.163-1.818-.39-2.74-.61l-.264-.062-.243.121c-.804.4-1.71.625-2.67.625a5.974 5.974 0 0 1-2.92-.756 8.517 8.517 0 0 1-2.18.256Z" />
          </svg>
        </button>
        {!currentChat && (
          <div className={styles.list}>
            <div className={styles.listTitle}>Chat</div>
            {conversations != null &&
              conversations.map((el) => (
                <div
                  onClick={() => {
                    setCurrentChat(el);
                  }}
                >
                  <Conversation
                    conversation={el}
                    isActive={el == currentChat}
                  />
                </div>
              ))}
          </div>
        )}
        {currentChat && (
          <div className={styles.chat}>
            <div className={styles.firstRow}>
              <button
                className={styles.backButton}
                onClick={() => {
                  setCurrentChat(null);
                }}
              >
                <svg
                  className={styles.backButtonIcon}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12.727 3.687a1 1 0 1 0-1.454-1.374l-8.5 9a1 1 0 0 0 0 1.374l8.5 9.001a1 1 0 1 0 1.454-1.373L4.875 12l7.852-8.313Z" />
                </svg>
              </button>
              <Conversation conversation={currentChat} isActive={true} />
            </div>
            <div className={styles.mexContainer}>
              {messages.map((m) => (
                <Message message={m} own={m.senderID === user._id} />
              ))}
              <div ref={divRef} />
            </div>
            <form className={styles.newMex}>
              <input
                className={styles.newMexInput}
                type="text"
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="scrivi un messaggio..."
                value={newMessage}
              />
              <input
                className={styles.fileInput}
                id="fileInput"
                type="file"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                  setNewMessage(e.target.files[0].name);
                }}
              />
              <label className={styles.fileInputLabel} htmlFor="fileInput">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="upload"
                  class="svg-inline--fa fa-upload fa-w-16"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                  ></path>
                </svg>
                <span>Invia immagine</span>
              </label>
              {user.isOwner &&<button type="button" onClick={() => setShowForm(!showForm)}>
                Crea Proposta di Acquisto
              </button>}
              {(showForm&& user.isOwner==true) && (
                <div class={styles.proposalContainer}>
                  <form class={styles.proposalForm}>
                    <button
                      type="button"
                      class={styles.propClose}
                      onClick={() => setShowForm(!showForm)}
                    >
                      X
                    </button>
                    <div>Invia una proposta di Acquisto</div>
                    <input type="text" placeholder="Nome prodotto"  value={purchaseProposal.name}            onChange={(e) => {
                  setPurchaseProposal({...purchaseProposal, name:e.target.value});
                }}/>
                    <input type="number" placeholder="Prezzo" value={purchaseProposal.price}  onChange={(e) => {
                  setPurchaseProposal({...purchaseProposal, price:e.target.value});
                }}/>
                    <input type="number" value={purchaseProposal.shippingCost} placeholder="spedizione"  onChange={(e) => {
                  setPurchaseProposal({...purchaseProposal, shippingCost:e.target.value});
                }}/>

                    <button type="submit" onClick={handleSubmit}>
                      Invia
                    </button>
                    <div>cos'è una "proposta di acquisto?</div>
                    <div>
                      E' un modo semplice e veloce per permettere bla bla bla
                    </div>
                  </form>
                </div>
              )}

              <button
                type="submit"
                disabled={!newMessage && !image}
                class={styles.sendMessageButton}
                onClick={handleSubmit}
              >
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="m12.815 12.197-7.532 1.256a.5.5 0 0 0-.386.318L2.3 20.728c-.248.64.421 1.25 1.035.943l18-9a.75.75 0 0 0 0-1.342l-18-9c-.614-.307-1.283.304-1.035.943l2.598 6.957a.5.5 0 0 0 .386.319l7.532 1.255a.2.2 0 0 1 0 .394Z" />
                </svg>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
