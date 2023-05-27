import styles from "./CartProduct.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Alert } from "@mui/material";

const CartProduct = (props) => {
  const productId = props.product.productID;
  console.log("prop",props.product)
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProduct();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getProduct = async () => {
    const response = await fetch(
      "http://localhost:3001/products/" + props.product.productID,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    console.log("ottenuto",data);
    setProduct(data);
  };

  const removeProduct = async () => {
    const savedStoreResponse = await fetch(
      "http://localhost:3001/carts/removeProduct",
      {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` 
      },
        body: JSON.stringify(props.product),
      }
    )
       
    const savedStore = await savedStoreResponse.json();
    window.location.reload();

  };


  if (!product) return null;
  return (
    <>
      <div className={styles.card}>
        <img className={styles.icon} src="/assets/productIcon.png" />

          <div
            className={styles.name}
            onClick={() => {
              navigate("/prodotto/" + product._id);
            }}
          >
            {product.name}
          </div>
          <div className={styles.street}>{props.product.quantity}</div>
          <div className={styles.street}>{props.product.price}</div>
          <button className="mainButtonRed"             onClick={() => {
              removeProduct();
              
            }}>X</button>
        </div>

    </>
  );
};

export default CartProduct;
/*

*/