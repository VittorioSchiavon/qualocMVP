import styles from "./ProductBadge.module.css";
import { useNavigate } from "react-router-dom";

const ProductBadge = ({ product }) => {
  const navigate = useNavigate();
  return (

    
    <>
      <div className={styles.container} onClick={() => navigate("/prodotto"+product._id)} 
      style={{
        cursor: 'pointer'
      }}>{/** 
        {product?.picture ? (
          <img
            src={"http://localhost:3001/assets/" + product?.picture}
            alt=""
            className={styles.image}
          />
        ) : (
          <div className={styles.Icon}>{product.name}</div>
        )}*/}
        <div className={styles.name}>{product.name} <span className={styles.info}>(qnt:{product.quantity} - opz: {product.option} - prezzo:  
                  {product.price}€)</span></div>

        
      </div>
    </>
  );
};

export default ProductBadge;
