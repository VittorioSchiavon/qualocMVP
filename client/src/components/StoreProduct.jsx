import styles from "./StoreProduct.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { useSelector } from "react-redux";
import { PopupContext } from "App";
import Loader from "./Loader";

const StoreProduct = (props) => {
  const product = props.product;
  const navigate = useNavigate();


  return (
    <>
      <div className={styles.container} >
        {product?.picture ? (
          <img
            src={Array.isArray(product?.picture)? "http://localhost:3001/assets/"+product?.picture[0]: "http://localhost:3001/assets/"+product?.picture} 
            alt=""
            className={styles.image}
            onClick={() => navigate("/prodotto/"+product._id)}
          />
        ) : (
          <img src="/assets/productIcon.png" />
        )}
        <div className={styles.name} onClick={() => navigate("/prodotto/"+product._id)}>{product.name}</div>
        <div className={styles.buttonContainer}>
          <button onClick={() => navigate("/modificaProdotto/"+product._id)} className="mainButtonYellow">modifica</button>
          <button onClick={() => props.deleteFunction(product._id)} className="mainButtonRed">rimuovi</button>
        </div>
        
      </div>
    </>
  );
};

export default StoreProduct;
