import styles from "./DashOrders.module.css";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import OrdersSection from "./OrdersSection";

const DashOrders = () => {
  const navigate = useNavigate();
  //var storeId = useParams();
  const [orders, setOrders] = useState(null);
  const token = useSelector((state) => state.token);


  useEffect(() => {
    getOrders();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getOrders = async () => {
    const response = await fetch(`http://localhost:3001/orders/shopOrders/all`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },

    });
    const data = await response.json();
    setOrders(data);
    console.log("ordini", data)
  };

  return (
    <>
    <OrdersSection type="store"/>
    </>
  );
};

export default DashOrders;


/*

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

    </div>*/