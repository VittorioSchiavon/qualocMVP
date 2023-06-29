import styles from "./ReviewCard.module.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Badge from "./Badge";

const ReviewCard = ({ review }) => {
  const navigate = useNavigate();
  //var storeId = useParams();
  const [user, setUser] = useState(null);
  const [show, setShow] = useState(true);
  const userAccount = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  


  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getUser = async () => {
    console.log("user id is", review?.userID);
    var link = "http://localhost:3001/users/" + review?.userID;
    const response = await fetch(link, {
      method: "GET",
    });
    const data = await response.json();
    setUser(data);
  };
  const deleteReview = async () => {
    console.log("deleteing");
    var link = "http://localhost:3001/reviews/delete/" + review?._id;
    const response = await fetch(link, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    
    });
    const data = await response.json();
    if (response.status=="200") setShow(false)
    };
  return (
    <>
    {show &&
      <div className={styles.container}>
        {userAccount?._id == review.userID && (
          <button
            className={styles.deleteButton}
            onClick={() => {
              deleteReview();
            }}
          >
            elimina
          </button>
        )}
        <div className={styles.firstRow}>
<Badge image={user?.picturePath} path={""} name={user?.firstName + " "+user?.lastName }/>
          <div className={styles.ratingsContainer}>
            <div className={styles.rating}>
              <div className={styles.ratingLabel}>Prodotto</div>
              <div className={styles.ratingValue}>{review.productRating}/5</div>
            </div>
            <div className={styles.rating}>
              <div className={styles.ratingLabel}>Servizio</div>
              <div className={styles.ratingValue}>{review.serviceRating}/5</div>
            </div>
          </div>
        </div>

        <div className={styles.content}>"{review.content}"</div>
        <div className={styles.date}>{review?.createdAt.slice(0, 10)}</div>
      </div>
}
    </>
  );
};

export default ReviewCard;
