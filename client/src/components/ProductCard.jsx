import styles from "./ProductCard.module.css";
import { useNavigate } from "react-router-dom";
import RatingStars from "./RatingStars";
const ProductCard = (props) => {
  const product = props.product;
  console.log(product)
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

        {product?.picture!=null && typeof(product?.picture)!=undefined && product?.picture.length!=0  ? (
                <img
                src={"http://localhost:3001/assets/" + product?.picture[0]}
                  alt=""
                  className={styles.icon}
                />
              ) : (
<img src="/assets/product.png" alt="" className={styles.noIcon}/>
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
