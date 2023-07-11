import styles from "./ImageDisplay.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ImageDisplay = ({ collection }) => {
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(collection[0]);

  return (
    <>
      <div className={styles.imagesContainer}>
        {collection.length == 0 ?(
          <img
            src="/assets/product.png"
            className={styles.activeImg}
          />
        ):(
        <a href={`http://localhost:3001/assets/${activeImage}`}>
          {" "}
          <img
            src={"http://localhost:3001/assets/" + activeImage}
            className={styles.activeImg}
          />
        </a>)}
        {collection?.length > 1 && (
          <div className={styles.fullImageList}>
            {collection?.map((img) => (
              <img
                src={"http://localhost:3001/assets/" + img}
                className={styles.productImg}
                onClick={() => setActiveImage(img)}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ImageDisplay;
