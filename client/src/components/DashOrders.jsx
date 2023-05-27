import styles from "./DashOrders.module.css";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const DashOrders = () => {
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

  
    <div className={styles.card}>
      <div className={styles.cardTitle}>Ordini Da Confermare (2)</div>
      <div  className={styles.order}>
        <div  className={styles.products}>1 prodotto, 3 prodotto</div>
        <div  className={styles.address}>via gola 15</div>
        <div  className={styles.actions}><button className="mainButtonGreen">Conferma</button>
        <button className="mainButtonRed">Cancella</button></div>
      </div>
      <div  className={styles.order}>
        <div  className={styles.products}>1 prodotto</div>
        <div  className={styles.address}>via ruccsf 234</div>
        <div  className={styles.actions}><button className="mainButtonGreen">Conferma</button>
        <button className="mainButtonRed">Cancella</button></div>
      </div>
      <a href="#" className={styles.seeMore}>Mostra di più</a>
    </div>
    <div className={styles.card}>
      <div className={styles.cardTitle}>Ordini Da Spedire (23)</div>
      <div  className={styles.order}>
        <div  className={styles.products}>1 prodotto, 3 prodotto</div>
        <div  className={styles.address}>via gola 15</div>

      </div>
      <div  className={styles.order}>
        <div  className={styles.products}>1 prodotto, 3 prodotto</div>
        <div  className={styles.address}>via gola 15</div>

      </div>
      <div  className={styles.order}>
        <div  className={styles.products}>1 prodotto, 3 prodotto</div>
        <div  className={styles.address}>via gola 15</div>

      </div>
      <a href="#" className={styles.seeMore}>Mostra di più</a>

    </div>
    <div className={styles.card}>
      <div className={styles.cardTitle}>Ordini Completati (467)</div>
      <div  className={styles.order}>
        <div  className={styles.products}>1 prodotto, 3 prodotto</div>
        <div  className={styles.address}>via gola 15</div>

      </div>
      <div  className={styles.order}>
        <div  className={styles.products}>1 prodotto, 3 prodotto</div>
        <div  className={styles.address}>via gola 15</div>

      </div>
      <div  className={styles.order}>
        <div  className={styles.products}>1 prodotto, 3 prodotto</div>
        <div  className={styles.address}>via gola 15</div>
      </div>
      <div  className={styles.order}>
        <div  className={styles.products}>1 prodotto, 3 prodotto</div>
        <div  className={styles.address}>via gola 15</div>

      </div>
      <a href="#" className={styles.seeMore}>Mostra di più</a>

    </div>

    </div>
    </>
  );
};

export default DashOrders;
