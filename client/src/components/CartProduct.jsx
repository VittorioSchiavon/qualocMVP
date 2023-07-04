import styles from "./CartProduct.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { useSelector } from "react-redux";
import { Alert } from "@mui/material";
import { PopupContext } from "App";
import Loader from "./Loader";

const CartProduct = (props) => {
  const productId = props.product.productID;
  console.log("prop", props.product);
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const [product, setProduct] = useState(null);
  const [store, setStore] = useState(null);
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
    setProduct(data.product);
    setStore(data.store)
  };

  return (
    <>
    {!product? <Loader/>:
      <div className={styles.card}>
        
       {
        product.picture[0]?
        <img className={styles.image} src={"http://localhost:3001/assets/" + product.picture[0]}/>
        :
        <img className={styles.image} src={"/productIcon.png"}/>
       } 
<div>
        <div
          className={styles.name}
          onClick={() => {
            navigate("/prodotto/" + product._id);
          }}
        >
          {product.name} {product.isTemp && "(prodotto aggiunto tramite chat)"}
        </div>
        <div>{store?.name}</div>
        </div>
        <div>
        <div className={styles.info}><span className={styles.lable}>Quantità:</span> :{props.product.quantity}</div>
        {props.product.option &&
        <div className={styles.info}><span className={styles.lable}>Opzione:</span> {props.product.option}</div>}
        </div>
        <div className={styles.price}>{props.product.price} €</div>
        <button className="mainButtonRed" onClick={()=>{props.removeProduct(props.product)}}>
          X
        </button>
      </div>
}
    </>
  );
};

export default CartProduct;
/*

*/
