import styles from "./StoreCard.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
const ProductCard = (props) => {
const product= props.product
  const navigate = useNavigate();

/*
  var storeId="64688294cd9a48ecdfeac97a"
  if(!storeId) storeId="64688294cd9a48ecdfeac97a"
  const [store, setStore] = useState(null);

  useEffect(() => {
    getStore();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getStore = async () => {
    const response = await fetch(`http://localhost:3001/stores/${storeId}`, {
      method: "GET",
    });
    const data = await response.json();
    setStore(data);
  };*/
  if (!product) return null;
  return <>
  <div className={styles.card}             onClick={() => {
              navigate("/prodotto/"+product._id);
            }}>
    <img className={styles.icon} src="/assets/productIcon.png"/>

    <div>
    <div className={styles.name}>{product.name}</div>
    <div className={styles.street}>{product.price}</div>
    </div>

  </div>
  </>
};

export default ProductCard;