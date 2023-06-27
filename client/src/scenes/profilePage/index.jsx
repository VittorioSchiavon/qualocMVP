import styles from "./profilePage.module.css";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "state";
import { useNavigate } from "react-router-dom";
import OrdersSection from "components/OrdersSection";

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

  const setOffline= async () =>{
      const response = await fetch("http://localhost:3001/users/setOffline/"+user._id, {
        method: "GET",      });
      const data = await response.json();
  }
  if (!user) return null;

  return (
    <>
      <Navbar />
      {token != null ? (
        <div className={styles.container}>
          <div className={styles.titlo}>il mio profilo</div>

          <div className={styles.actionsContainer}>
                  <button
                    className="mainButtonGreen"
                    onClick={() => {
                      setOffline()
                      dispatch(setLogout());
                      navigate("/");
                    }}
                  >
                    Esci dall'account
                  </button>

                  <button className="mainButtonGreen">Modifica</button>
                  <button className="mainButtonRed">Elimina Account</button>
                </div>

            <div className={styles.dataContainer}>
              {user?.picturePath ? (
                <img
                  src={"http://localhost:3001/assets/" + user?.picturePath}
                  alt=""
                  className={styles.profilePicture}
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.noProfilePic}
                  viewBox="0 0 24 24"
                >
                  <path d="M2,3H22C23.05,3 24,3.95 24,5V19C24,20.05 23.05,21 22,21H2C0.95,21 0,20.05 0,19V5C0,3.95 0.95,3 2,3M14,6V7H22V6H14M14,8V9H21.5L22,9V8H14M14,10V11H21V10H14M8,13.91C6,13.91 2,15 2,17V18H14V17C14,15 10,13.91 8,13.91M8,6A3,3 0 0,0 5,9A3,3 0 0,0 8,12A3,3 0 0,0 11,9A3,3 0 0,0 8,6Z" />
                </svg>
              )}
              
              <div className={styles.textData}>

                <div className={styles.data}>
                  {" "}
                  <span className={styles.dataLabel}> nome: </span>{" "}
                  {user?.firstName + " " + user?.lastName}
                </div>
                <div className={styles.data}>
                  {" "}
                  <span className={styles.dataLabel}> email: </span>{" "}
                  {user?.email}
                </div>
                <div className={styles.data}>
                  {" "}
                  <span className={styles.dataLabel}> indirizzo: </span>{" "}
                  {user?.address ? user?.address : "indirzzo non inserito"}
                </div>
                <div className={styles.data}>
                  {" "}
                  <span className={styles.dataLabel}>
                    {" "}
                    numero di telefono:{" "}
                  </span>{" "}
                  {user?.phone ? user?.phone : "numero di telefono non inserito"}
                </div>
              </div>
            </div>
            {user.isOwner ? (
                    <button
                      className={styles.bigButton}
                      onClick={() => {
                        navigate("/ilMioNegozio");
                      }}
                    ><svg xmlns="http://www.w3.org/2000/svg" className={styles.icon} viewBox="0 0 24 24"><path d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z" /></svg>
                      Gestisci il tuo negozio
                    </button>
                  ) : (
                    ""
                  )}
          <div className={styles.secondContainer}>
            <div className={styles.box}>il mio carrello</div>
            <div className={styles.box}>I miei ordini
            <OrdersSection type={"client"}/>
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
