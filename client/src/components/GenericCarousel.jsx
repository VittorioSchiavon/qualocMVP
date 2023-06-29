import styles from "./GenericCarousel.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import StoreCard from "./StoreCard";
import Draggable from 'react-draggable';

const GenericCarousel = ({collection, type, title}) => {
  const navigate = useNavigate();
  const [trans, setTrans] = useState(0);

  const cardWidth = 400;
  return (

    <div className={styles.totContainer}>
      <div className="mainTitle">{title}</div>
      
      <div className={styles.container}>
      <button  className={styles.buttonArrow}
        onClick={() => {
          setTrans(trans + cardWidth>200? 0:  trans + cardWidth);
        }}
      >
        <svg  className={styles.arrow} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M15.707 4.293a1 1 0 0 1 0 1.414L9.414 12l6.293 6.293a1 1 0 0 1-1.414 1.414l-7-7a1 1 0 0 1 0-1.414l7-7a1 1 0 0 1 1.414 0Z" /></svg>
      </button>
        <div
          className={styles.carousel}
          style={{ transform: "translateX(" + trans + "px)" }}
        >
          {collection.map((el) => (
            type=="product"?  <ProductCard key={el._id} product={el}/> : <StoreCard key={el._id} store={el}/>
          ))}
        </div>
        
      <button className={styles.buttonArrowRight}
        onClick={() => {
          setTrans( trans - cardWidth);
        }}
      >
       <svg className={styles.arrow} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M8.293 4.293a1 1 0 0 0 0 1.414L14.586 12l-6.293 6.293a1 1 0 1 0 1.414 1.414l7-7a1 1 0 0 0 0-1.414l-7-7a1 1 0 0 0-1.414 0Z"/></svg>
      </button>
      </div>
    </div>

  );
};

export default GenericCarousel;
