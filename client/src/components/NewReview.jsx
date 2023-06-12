import styles from "./NewReview.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GenericCarousel from "./GenericCarousel";
import { useSelector } from "react-redux";

const NewReview = ({ productID }) => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);

  //var storeId = useParams();
  const [serviceRating, setServiceRating] = useState(0);
  const [productRating, setProductRating] = useState(0);
  const [content, setContent] = useState("");

  const addProductReview = async (values, onSubmitProps) => {
    const newReview = {
      productID: productID,
      serviceRating: serviceRating,
      productRating: productRating,
      content: content,
    };
    const savedProductReviewResponse = await fetch(
      "http://localhost:3001/reviews/add",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newReview),
      }
    );

    const savedProductReview = await savedProductReviewResponse.json();
    console.log("savedProductReview", savedProductReview);
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    // Create a new review object

    addProductReview();

    // Pass the new review to the parent component

    // Reset the form
    setProductRating(0);
    setServiceRating(0);
    setContent("");
  };
  return (
    <>
      <div className={styles.title}>Inserisci una Recensione</div>
      <div className={styles.container}>
        <div className={styles.userData}>
          {user?.picturePath ? (
            <img
              src={"http://localhost:3001/assets/" + user?.picturePath}
              alt=""
              className={styles.userImage}
            />
          ) : (
            <svg
              className={styles.userIcon}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M18,19H6V17.6C6,15.6 10,14.5 12,14.5C14,14.5 18,15.6 18,17.6M12,7A3,3 0 0,1 15,10A3,3 0 0,1 12,13A3,3 0 0,1 9,10A3,3 0 0,1 12,7M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3Z" />
            </svg>
          )}
          <div className={styles.userName}>{user?.firstName}</div>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div  className={styles.ratingsContainer}>

          
          <div>Prodotto:</div>
          <div className={styles.ratingButtonsContainer}>

          <button
            type="button"
            className={`${styles.optionButton} ${
              productRating > 0 ? styles.selected : ""
            }`}
            onClick={() => {
              setProductRating(1);
            }}
          ></button>
          <button
            type="button"
            className={`${styles.optionButton} ${
              productRating > 1 ? styles.selected : ""
            }`}
            onClick={() => {
              console.log("helloo")
              setProductRating(2);
            }}
          ></button>
          <button
            type="button"
            className={`${styles.optionButton} ${
              productRating > 2 ? styles.selected : ""
            }`}
            onClick={() => {
              setProductRating(3);
            }}
          ></button>
          <button
            type="button"
            className={`${styles.optionButton} ${
              productRating > 3 ? styles.selected : ""
            }`}
            onClick={() => {
              setProductRating(4);
            }}
          ></button>
                    <button
            type="button"
            className={`${styles.optionButton} ${
              productRating > 4 ? styles.selected : ""
            }`}
            onClick={() => {
              setProductRating(5);
            }}
          ></button>
          </div>
          <div>Servizio:</div>
          <div className={styles.ratingButtonsContainer}>

          <button
            type="button"
            className={`${styles.optionButton} ${
              serviceRating > 0 ? styles.selected : ""
            }`}
            onClick={() => {
              setServiceRating(1);
            }}
          ></button>
          <button
            type="button"
            className={`${styles.optionButton} ${
              serviceRating > 1 ? styles.selected : ""
            }`}
            onClick={() => {
              console.log("helloo")
              setServiceRating(2);
            }}
          ></button>
          <button
            type="button"
            className={`${styles.optionButton} ${
              serviceRating > 2 ? styles.selected : ""
            }`}
            onClick={() => {
              setServiceRating(3);
            }}
          ></button>
          <button
            type="button"
            className={`${styles.optionButton} ${
              serviceRating > 3 ? styles.selected : ""
            }`}
            onClick={() => {
              setServiceRating(4);
            }}
          ></button>
                    <button
            type="button"
            className={`${styles.optionButton} ${
              serviceRating > 4 ? styles.selected : ""
            }`}
            onClick={() => {
              setServiceRating(5);
            }}
          ></button>
          </div>
          </div>
          <textarea
            className={styles.content}
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
            placeholder="insrrisci il testo della recensione"
          />
          <button type="submit" className="mainButtonGreen">
            Invia Recensione
          </button>
        </form>
      </div>
    </>
  );
};

export default NewReview;
