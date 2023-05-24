import styles from "./storePage.module.css";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const StorePage = () => {
  const navigate = useNavigate();
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
  };


  if (!store) return null;

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.titlo}>{store.shopName}</div>
        <div className={styles.tagContainer}>
          <div className="mainButtonYellow">test</div>
        </div>
        <div className={styles.dataContainer}>
          <div className={styles.dataContainer}>
            <div className={styles.name}>
              nome: {store.firstName + " " + store.lastName}
            </div>
            <div className={styles.email}>email: {store.email}</div>
          </div>
        </div>
        <div className={styles.secondContainer}>
        <div className={styles.box}>il mio carrello</div>
            <div className={styles.box}>I miei ordini</div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default StorePage;
