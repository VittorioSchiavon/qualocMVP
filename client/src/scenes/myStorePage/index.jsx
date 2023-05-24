import styles from "./myStorePage.module.css";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "state";
import { useNavigate } from "react-router-dom";

const MyStorePage = () => {
  const [store, setStore] = useState(null);
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();

  const getMyStore = async () => {
    const response = await fetch("http://localhost:3001/stores/myStore", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    console.log(data);
    setStore(data);
  };
  useEffect(() => {
    getMyStore();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  console.log(token);
  if (!token) navigate("/login");
  if (token == null) {
    return null;
  }

  if (!store) return null;

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.titlo}>{store.name}</div>
        <div className={styles.tagContainer}>
          <div className="mainButtonYellow">test</div>
        </div>
        <div className={styles.dataContainer}>
          <div className={styles.dataContainer}>
            <div className={styles.name}>nome:{store.street}</div>
            <div className={styles.email}>email: </div>
          </div>
        </div>
        <div className={styles.secondContainer}></div>
      </div>
      <Footer />
    </>
  );
};

export default MyStorePage;
