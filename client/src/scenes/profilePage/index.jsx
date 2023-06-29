import styles from "./profilePage.module.css";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "state";
import { useNavigate } from "react-router-dom";
import OrdersSection from "components/OrdersSection";
import ImageDisplay from "components/ImageDisplay";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const token = useSelector((state) => state.token);
  const userId = useSelector((state) => state.user._id);
  const isOwner = useSelector((state) => state.user.isOwner);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    getUser();
  }, []);

  console.log(token);
  if (!token) navigate("/login");
  if (token == null) {
    return null;
  }

  var link = `http://localhost:3001/users`;
  const getUser = async () => {
    const response = await fetch(link, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
    console.log("user", data);
  };

  var link = `http://localhost:3001/users`;
  const deleteUser = async () => {
    const response = await fetch(link, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  const setOffline = async () => {
    const response = await fetch(
      "http://localhost:3001/users/setOffline/" + user._id,
      {
        method: "GET",
      }
    );
    const data = await response.json();
  };
  if (!user) return null;

  return (
    <>
      <Navbar />
      {token != null ? (
        <div className={styles.container}>
          <div className="mainTitle">Il mio profilo</div>
          <div className={styles.dataContainer}>
            <ImageDisplay collection={[user.picturePath]}/>

            <div className={styles.textData}>
              <div className={styles.actionsContainer}>
                <button
                  className="mainButtonRed"
                  onClick={() => {
                    setOffline();
                    dispatch(setLogout());
                    navigate("/");
                  }}
                >
                  Esci dall'account
                </button>
              </div>

              <div className={styles.data}>
                <span className={styles.dataLabel}> nome: </span>
                {user?.firstName + " " + user?.lastName}
              </div>
              <div className={styles.data}>
                <span className={styles.dataLabel}> email: </span> {user?.email}
              </div>
              {/*
              <div className={styles.data}>
                <span className={styles.dataLabel}> indirizzo: </span>
                {user?.address ? user?.address : "indirzzo non inserito"}
              </div>
              <div className={styles.data}>
                <span className={styles.dataLabel}>
                  numero di telefono:
                </span>
                {user?.phone ? user?.phone : "numero di telefono non inserito"}
              </div>
              */}
              
          {user.isOwner ? (
            <button
              className={styles.bigButton}
              onClick={() => {
                navigate("/ilMioNegozio");
              }}
            >
              Gestisci il tuo negozio
            </button>
          ) : (
            <button
            className={styles.bigButton}
            onClick={() => {
              navigate("/creaNegozio");
            }}
          >
            Crea un negozio
          </button>

          )}
            </div>
            
          </div>
          <div className={styles.secondContainer}>
            <div className={styles.box}>
              I miei ordini
              <OrdersSection type={"client"} />
            </div>
          </div>
        </div>
      ) : (
        <a href="/login">please login</a>
      )}
      <Footer />
    </>
  );
};

export default ProfilePage;
