import styles from "./storePage.module.css";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import ProductCarousel from "components/ProductCarousel";

const StorePage = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);

  var storeId = useParams();
  console.log("ciao")
  console.log(storeId.id)
  //var storeId="64688294cd9a48ecdfeac97a"
  if(!storeId) storeId="64688294cd9a48ecdfeac97a"
  const [store, setStore] = useState(null);

  useEffect(() => {
    getStore();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getStore = async () => {
    const response = await fetch(`http://localhost:3001/stores/${storeId.id}`, {
      method: "GET",
    });
    const data = await response.json();
    setStore(data);
    console.log("🚀 ~ file: index.jsx:29 ~ getStore ~ data:", data)

  };
  

    const createConversation = async () => {
      
      const conv={receiverID: store.ownerID}
      const savedConversationResponse = await fetch(
        "http://localhost:3001/conversations/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(conv),
        }
      );
      const savedConversation = await savedConversationResponse.json();
      navigate("/chat")
    }; 
    

  if (!store) return null;

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <button className="mainButtonGreen" onClick={createConversation}>Manda un messaggio!</button>
        {store?.picture ? (
                <img
                  src={"http://localhost:3001/assets/" + store?.picture}
                  alt=""
                  className={styles.storeImg}
                />
              ) : (
<img src="/assets/storeIcon.png" alt="" className={styles.storeImg}/>
              )}
        <div className={styles.tagContainer}>
          {store.tags!=null && store.tags.map((el)=>{
            return <div className="mainButtonYellow">{el}</div>
          })}
        </div>
        <div className={styles.titlo}>{store.name}</div>

        <div className={styles.dataContainer}>
          <div className={styles.dataContainer}>
            <div className={styles.name}>
              {store.street + " " + store.streetNumber+ ", " + store.city + " " + store.postalCode}
            </div>
            <div className={styles.email}>{store.description}</div>
          </div>
        </div>
        <div className={styles.secondContainer}>
          <div className={styles.title}>Prodotti del negozio</div>
          <ProductCarousel storeID={store._id}/>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default StorePage;
