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
    console.log("🚀 ~ file: index.jsx:29 ~ getStore ~ data:", data)

  };
  


  if (!store) return null;

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <img src="/assets/storeIcon.png" alt="" className={styles.storeImg}/>
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
        </div>
      </div>
      <Footer />
    </>
  );
};

export default StorePage;
