import styles from "./productPage.module.css";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {  useSelector } from "react-redux";


const ProductPage = () => {
  const navigate = useNavigate();
  var productId = useParams();
  const token = useSelector((state) => state.token);

  console.log("ciao")
  console.log(productId.id)
  //var productId="64688294cd9a48ecdfeac97a"
  if(!productId) productId="64688294cd9a48ecdfeac97a"
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProduct();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getProduct = async () => {
    const response = await fetch(`http://localhost:3001/products/${productId.id}`, {
      method: "GET",
    });
    const data = await response.json();
    setProduct(data);
  };

  const addToCart = async () => {
    console.log("here");
    const values={
      productID: product._id,
      quantity: 1,
      option: product.options[0],
      price: product.price
    }
    console.log(values);

    const savedStoreResponse = await fetch(
      "http://localhost:3001/carts/addProduct",
      {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` 
      },
        body: JSON.stringify(values),
      }
    );
    const savedStore = await savedStoreResponse.json();
  };


  if (!product) return null;

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.titlo}>{product.name}</div>
          <div className={styles.dataContainer}>
            <div className={styles.name}>
              prezzo: {product.price + "€ "}
            </div>
            <div className={styles.name}>
              Spedizione: {product.shippingCost + "€ "}
            </div>
            <div className={styles.email}>opzioni: {product.options}</div>
          </div>
        </div>
        <button className="mainButtonGreen" onClick={addToCart}>Aggiungi al carrello</button>
      <Footer />
    </>
  );
};

export default ProductPage;
