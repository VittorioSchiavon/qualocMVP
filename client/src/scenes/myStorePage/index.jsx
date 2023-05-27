import styles from "./myStorePage.module.css";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "state";
import { useNavigate } from "react-router-dom";
import Dashboard from "components/Dashboard";
import DashOrders from "components/DashOrders";
import DashProducts from "components/DashProducts";
import DashSettings from "components/DashSettings";

const MyStorePage = () => {
  const [store, setStore] = useState(null);
  const [activeDash, setActiveDash] = useState(0);
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
        <ul className={styles.navbar}>
          <li onClick={()=>{setActiveDash(0)}}>Statistiche</li>
          <li onClick={()=>{setActiveDash(1)}}>Prodotti</li>
          <li onClick={()=>{setActiveDash(2)}}>Ordini</li>
          <li onClick={()=>{setActiveDash(3)}}>Impostazioni</li>
        </ul>
        {activeDash==0 && <Dashboard/>}
        {activeDash==1 && <DashProducts storeID={store._id}/>}
        {activeDash==2 && <DashOrders/>}
        {activeDash==3 && <DashSettings/>}
        
      </div>
      <Footer />
    </>
  );
};

export default MyStorePage;
