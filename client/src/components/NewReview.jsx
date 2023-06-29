import styles from "./NewReview.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const NewReview = ({ productID }) => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  //var storeId = useParams();
  const [serviceRating, setServiceRating] = useState(null);
  const [productRating, setProductRating] = useState(null);
  const [content, setContent] = useState("");
  const [sent, setSent] = useState(false);

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
    if (savedProductReviewResponse.status == "200") setSent(true);
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
      <div className={styles.container}>
        <div className={styles.title}>Inserisci una Recensione</div>
        <br></br>

        {sent ? (
          <div className={styles.sent}>
            Congratulazioni la tua recensione è stata inserita
          </div>
        ) : (
          <>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.ratingsContainer}>
                <div className={styles.ratingContainer}>
                  <div className={styles.ratingLable}>Prodotto</div>
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
                </div>
                <div className={styles.ratingContainer}>
                  <div className={styles.ratingLable}>Servizio</div>
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
              </div>
              <textarea
                className={styles.content}
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
                placeholder="inserisci il testo della recensione"
              />
              <button type="submit" className="mainButtonGreen">
                Invia Recensione
              </button>
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default NewReview;
