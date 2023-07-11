import Form from "./Form";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import styles from "./editProductPage.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const EditProductPage = () => {
  var params = useParams();
  const [product, setProduct] = useState(null);
  useEffect(() => {
    getProduct();
  }, []); 
  useEffect(() => {
    document.title = "qualoc Modifica Prodotto";  

  }, []);


  const getProduct = async () => {
    const response = await fetch(
      `http://localhost:3001/products/${params.id}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    setProduct(data.product);
    console.log("product",product)
  };
  return (
    <>
      <Navbar />

      <div className={styles.container}>
        <div className={`${styles.dataContainer} shadow`}>
            {product && <Form existingProduct={product}/>}
        </div>
      </div>
      <Footer />
    </>
  );
};


export default EditProductPage;
