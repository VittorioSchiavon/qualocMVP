import styles from "./OrdersSection.module.css";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import OrderCard from "./OrderCard";

const OrdersSection = ({type}) => {
  const navigate = useNavigate();
  //var storeId = useParams();
  const [orders, setOrders] = useState(null);
  const token = useSelector((state) => state.token);
  const [filter, setFilter] = useState('tutti');

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    console.log(filter)
  };

  useEffect(() => {
    getOrders();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getOrders = async () => {
    var link= `http://localhost:3001/orders/shopOrders/all`
    if (type=="client") link= `http://localhost:3001/orders/clientOrders/all`
    const response = await fetch(link, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },

    });
    const data = await response.json();
    setOrders(data);
    console.log("ordini", data)
  };

  return (
    <>
    <div className={styles.container}>
      
    <select className={styles.selection} value={filter} onChange={handleFilterChange}>
        <option value="tutti">Tutti gli ordini</option>
          <option value={"created"}>Ordini Creati</option>
          <option value={"confirmed"}>Ordini Confermati</option>

          <option value={"delivered"}>Ordini Spediti</option>

          <option  value={"completed"}>Ordini Completati</option>

      </select>
      
    {
    orders?.length>0 ? (orders?.map((ord) => (
      ord.status==filter || filter=="tutti"? (<OrderCard order={ord} type={type}/>) : <></>
          ))):
          <div className={styles.noOrders}>nessun ordine</div>
    }
    </div>
    </>
  );
};

export default OrdersSection;
