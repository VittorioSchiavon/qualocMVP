import styles from "./RatingStars.module.css";
import { useEffect, useState } from "react";

const RatingStars = ({ rating }) => {

  return (
    <>
          <div className={styles.ratingButtonsContainer}>

          <div
            className={`${styles.optionButton} ${
              rating > 0 ? styles.selected : ""
            }`}

          ></div>
          <div
            className={`${styles.optionButton} ${
              rating > 1 ? styles.selected : ""
            }`}

          ></div>
          <div

            className={`${styles.optionButton} ${
              rating > 2 ? styles.selected : ""
            }`}

          ></div>
          <div

            className={`${styles.optionButton} ${
              rating > 3 ? styles.selected : ""
            }`}

          ></div>
                    <div
            className={`${styles.optionButton} ${
              rating > 4 ? styles.selected : ""
            }`}
          ></div>
          </div>
    </>
  );
};

export default RatingStars;
