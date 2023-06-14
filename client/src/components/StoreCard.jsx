import styles from "./StoreCard.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import RatingStars from "./RatingStars";
const StoreCard = (props) => {
const store= props.store
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
  if (!store) return null;
  return <>
  <div className={styles.card}             onClick={() => {
              navigate("/negozio/"+store._id);
            }}>
            {store?.picture ? (
                <img
                  src={"http://localhost:3001/assets/" + store?.picture}
                  alt=""
                  className={styles.icon}
                />
              ) : (
<img src="/assets/storeIcon.png" alt="" className={styles.icon}/>
              )}

    <div className={styles.textDataContainer}>
      <RatingStars rating={store.rating}/>


    <div className={styles.name}>{store.name}</div>
    <div className={styles.tag}>{store.tags[0]}</div>


    </div>

  </div>
  </>
};

export default StoreCard;