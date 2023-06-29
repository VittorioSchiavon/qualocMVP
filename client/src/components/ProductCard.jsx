import styles from "./ProductCard.module.css";
import { useNavigate } from "react-router-dom";
import RatingStars from "./RatingStars";
const ProductCard = (props) => {
  const product = props.product;
  const navigate = useNavigate();
  if (!product) return null;
  return (
    <>
      <div
        className={styles.card}
        onClick={() => {
          navigate("/prodotto/" + product._id);
        }}
      >

        {product?.picture ? (
                <img
                  src={"http://localhost:3001/assets/" + product?.picture[0]}
                  alt=""
                  className={styles.icon}
                />
              ) : (
<img src="/assets/productIcon.png" alt="" className={styles.icon}/>
              )}
        <div className={styles.textDataContainer}>

          <RatingStars rating={product.rating} />
          {product.shippingCost==0 && <div className={styles.badge}>Spedizione Gratuita</div>}

          <div className={styles.name}>{product.name}</div>
          <div className={styles.price}>{product.price + "€"}</div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
