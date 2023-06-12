import styles from "./ReviewCard.module.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ReviewCard = ({ review }) => {
  const navigate = useNavigate();
  //var storeId = useParams();
  const [user, setUser] = useState(null);
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
    console.log("user", user);
  };
  const deleteReview = async () => {
    console.log("deleteing");
    var link = "http://localhost:3001/reviews/delete/" + review?._id;
    const response = await fetch(link, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    
    });
    const data = await response.json();
    };
  return (
    <>
      <div className={styles.container}>
        {user?._id == review.userID && (
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
    </>
  );
};

export default ReviewCard;
