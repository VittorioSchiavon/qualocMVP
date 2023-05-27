import styles from "./Dashboard.module.css";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  //var storeId = useParams();
  const [stores, setStores] = useState(null);

  useEffect(() => {
    getStores();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getStores = async () => {
    const response = await fetch(`http://localhost:3001/stores`, {
      method: "GET",
    });
    const data = await response.json();
    setStores(data);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.cardContainer}>
          
 
        <div className={styles.card}>
        <div className={styles.icon}>📋</div>
        <div>
        <div className={styles.cardTitle}>oridni</div>
          
          <div className={styles.data}>456K</div>
        </div>

        </div>
        <div className={styles.card}>
        <div className={styles.icon}>💰</div>
        <div>
        <div className={styles.cardTitle}>Ricavato</div>
          
          <div className={styles.data}>456K</div>
        </div>

        </div>
        <div className={styles.card}>
        <div className={styles.icon}>👩</div>
        <div>
        <div className={styles.cardTitle}>Clienti</div>
          
          <div className={styles.data}>4K</div>
        </div>

        </div>
        <div className={styles.card}>
        <div className={styles.icon}>📦</div>
        <div>
        <div className={styles.cardTitle}>Prodotti</div>
          
          <div className={styles.data}>456K</div>
        </div>

        </div>
        </div>
        <div className={styles.secondRow}>
        <div className={styles.topSelling}>
          <div>Top Selling Products</div>
        </div>
        <div className={styles.topSelling}>
          <div>Pendeing Orders</div>
        </div>
        </div>

      </div>
    </>
  );
};

export default Dashboard;
