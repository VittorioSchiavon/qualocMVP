import styles from "./GenericDisplay.module.css";
import ProductCard from "./ProductCard";
import StoreCard from "./StoreCard";

const GenericDisplay = ({collection, type, title}) => {
  return (
    <>
      <div className="mainTitle">{title}</div>
      <div className={styles.container}>
        <div
          className={styles.carousel}
        >
          {collection.map((el) => (
            type=="product"?  <ProductCard product={el}/> : <StoreCard store={el}/>
          ))}
        </div>
      
      </div>
    </>
  );
};

export default GenericDisplay;
