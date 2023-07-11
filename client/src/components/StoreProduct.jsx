import styles from "./StoreProduct.module.css";
import { useNavigate } from "react-router-dom";
const StoreProduct = (props) => {
  const product = props.product;
  const navigate = useNavigate();


  return (
    <>
      <div className={styles.container} >
        {product?.picture!=null && typeof(product?.picture)!=undefined && product?.picture.length!=0 && !product.isTemp? (
          <img
            src={Array.isArray(product?.picture)? "http://localhost:3001/assets/"+product?.picture[0]: "http://localhost:3001/assets/"+product?.picture} 
            alt=""
            className={styles.image}
            onClick={() => navigate("/prodotto/"+product._id)}
          />
        ) : (
          <img  className={styles.image} src="/assets/product.png" />
        )}
        <div className={styles.name} onClick={() => navigate("/prodotto/"+product._id)}>{product.name}</div>
        <div className={styles.buttonContainer}>
          <button onClick={() => navigate("/modificaProdotto/"+product._id)} className="mainButtonYellow">modifica</button>
          <button onClick={() => props.deleteFunction(props.type=="temp", product._id)} className="mainButtonRed">rimuovi</button>
        </div>
        
      </div>
    </>
  );
};

export default StoreProduct;
