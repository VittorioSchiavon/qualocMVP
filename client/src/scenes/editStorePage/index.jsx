import Form from "./Form";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import styles from "./editStorePage.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EditStorePage = () => {
  useEffect(() => {
    document.title = "qualoc Modifica Negozio";  

  }, []);
  
  var params = useParams();
  const [store, setStore] = useState(null);
  useEffect(() => {
    getStore();
  }, []); 


  const getStore = async () => {
    const response = await fetch(
      `http://localhost:3001/stores/${params.id}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    setStore(data.store);
    console.log("storeee", store)
  };
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div  className={`${styles.dataContainer} shadow`}>
        {store && <Form existingStore={store}/>}        </div>
      </div>
      <Footer />
    </>
  );
};

export default EditStorePage;
