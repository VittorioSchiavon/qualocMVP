import styles from "./profilePage.module.css";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "state";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const token = useSelector((state) => state.token);
  const userId = useSelector((state) => state.user._id);
  const isOwner= useSelector((state) => state.user.isOwner)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  console.log(token)
  if (!token) navigate("/login");
  if (token==null) {
    return null;
  }

  var link=`http://localhost:3001/users`
  const getUser = async () => {
    const response = await fetch(link, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  var link=`http://localhost:3001/users`
  const deleteUser = async () => {
    const response = await fetch(link, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };


  if (!user) return null;

  return (
    <>
      <Navbar />
      {token!=null ?
      <div className={styles.container}>
        <div className={styles.titlo}>il mio profilo</div>
        <div className={styles.actionsContainer}>
          <button
            className="mainButtonGreen"
            onClick={() => {
              dispatch(setLogout());
              navigate("/");
            }}
          >
            Logout
          </button>
          {user.isOwner?           <button
            className="mainButtonGreen"
            onClick={() => {
              navigate("/ilMioNegozio");
            }}
          >
            Gestisci negozio
          </button>:""}
          <button className="mainButtonGreen">Modifica</button>
          <button className="mainButtonRed">Elimina Account</button>
        </div>
        <div className={styles.dataContainer}>
          <div className={styles.dataContainer}>
            <div className={styles.name}>
              nome: {user.firstName + " " + user.lastName}
            </div>
            <div className={styles.email}>email: {user.email}</div>
          </div>
        </div>
        <div className={styles.secondContainer}>
        <div className={styles.box}>il mio carrello</div>
            <div className={styles.box}>I miei ordini</div>
        </div>
      </div>
    :
    <a href="/login">please login</a>
    }
      <Footer />
    </>
  );
};

export default ProfilePage;
