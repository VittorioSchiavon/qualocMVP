import styles from "./StoreCard.module.css";
import { useNavigate } from "react-router-dom";
import RatingStars from "./RatingStars";
const StoreCard = (props) => {
const store= props.store
  const navigate = useNavigate();
  if (!store) return null;
  return <>
  <div className={styles.card}             onClick={() => {
              navigate("/negozio/"+store._id);
            }}>
            {store?.picture!=null && typeof(store?.picture)!=undefined && store?.picture.length!=0 ? (
                <img
                  src={"http://localhost:3001/assets/" + store?.picture[0]}
                  alt=""
                  className={styles.icon}
                />
              ) : (
<img src="/assets/store.png" alt="" className={styles.icon}/>
              )}

    <div className={styles.textDataContainer}>
      <RatingStars rating={store.rating}/>


    <div className={styles.name}>{store.name}</div>
    <div className={`${styles.tag} tag`}>{store.tags[0]}</div>


    </div>

  </div>
  </>
};

export default StoreCard;