import Form from "./Form";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import styles from "./newProductPage.module.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const NewProductPage = () => {
  useEffect(() => {
    document.title = "qualoc Aggiungi Prodotto";  

  }, []);
  var params = useParams();
  return (
    <>
      <Navbar />

      <div className={styles.container}>
        <div className={`${styles.dataContainer} shadow`}>
            <Form/>
        </div>
      </div>
      <Footer />
    </>
  );
};


export default NewProductPage;
