import styles from "./GenericCarousel.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import StoreCard from "./StoreCard";

const GenericDisplay = ({collection, type, title}) => {
  const navigate = useNavigate();

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
