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
  const [option, setOption] = useState("");


  console.log("ciao")
  console.log(productId.id)
  //var productId="64688294cd9a48ecdfeac97a"
  if(!productId) productId="64688294cd9a48ecdfeac97a"
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    getProduct();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getProduct = async () => {
    const response = await fetch(`http://localhost:3001/products/${productId.id}`, {
      method: "GET",
    });
    const data = await response.json();
    setProduct(data);
    setOption(data.options[0])
    console.log("product",data)
  };

  const addToCart = async () => {
    const values={
      productID: product._id,
      quantity: quantity,
      option: option,
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
              prezzo: {product.price + "€ " + product.shippingCost + "€ (spedizione)"}
            </div>
            {product?.tags.map((tag)=> <span>{tag+"-"}</span> )}
            <div className={styles.name}>
              {product.description}
            </div>
            <span>opzioni:</span>
            <select className={styles.email} value={option} onChange={(e) => setOption(e.target.value)} >
              {product?.options.map((opt)=> <option value={opt}>{opt}</option> )}</select>
              <span>quantità:</span>
              <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)}/>

          </div>
        </div>
        <button className="mainButtonGreen" onClick={addToCart}>Aggiungi al carrello</button>
      <Footer />
    </>
  );
};

export default ProductPage;
