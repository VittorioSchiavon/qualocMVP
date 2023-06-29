import styles from "./ReviewsSection.module.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NewReview from "./NewReview";
import ReviewCard from "./ReviewCard";

const ReviewsSection = ({ productID }) => {
  //var storeId = useParams();
  const [reviews, setReviews] = useState(null);
  useEffect(() => {
    
    getProductReviews();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getProductReviews = async () => {
    var link = "http://localhost:3001/reviews/" + productID;
    const response = await fetch(link, {
      method: "GET",
    });
    const data = await response.json();

    setReviews(data);
    console.log("revi", reviews)
  };

  if (!reviews) return null;
  return (
    <>
    <NewReview productID={productID}/>
    <div className={styles.title}>Recensioni ({reviews.length}) </div>
      {reviews.map((el) => (
        <ReviewCard review={el}/>
      ))}{" "}
    </>
  );
};

export default ReviewsSection;
