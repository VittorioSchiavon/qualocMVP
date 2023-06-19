import styles from "./CartProduct.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { useSelector } from "react-redux";
import { Alert } from "@mui/material";
import { PopupContext } from "App";

const CartProduct = (props) => {
  const productId = props.product.productID;
  console.log("prop", props.product);
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const [product, setProduct] = useState(null);
  const [popup, setPopup] = useContext(PopupContext);

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
    console.log("response", response);
    if (response.statusText != "OK")
      setPopup({ type: "error", message: "Operazione non riuscita" });
    const data = await response.json();
    setProduct(data);
  };

  if (!product) return null;
  return (
    <>
      <div className={styles.card}>
        <img className={styles.image} src={"http://localhost:3001/assets/" + product.picture[0]}/>

        <div
          className={styles.name}
          onClick={() => {
            navigate("/prodotto/" + product._id);
          }}
        >
          {product.name}
        </div>
        <div className={styles.street}>{props.product.quantity}</div>
        <div className={styles.street}>{props.product.option}</div>
        <div className={styles.street}>{props.product.price} €</div>
        <button className="mainButtonRed" onClick={()=>{props.removeProduct(props.product)}}>
          X
        </button>
      </div>
    </>
  );
};

export default CartProduct;
/*

*/
