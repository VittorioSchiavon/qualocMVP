import styles from "./StoreCarousel.module.css";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import StoreCard from "./StoreCard";

const StoreCarousel = () => {
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

  if (!stores) return null;
  console.log(stores)
  return (
    <div className={styles.container}>
    {stores.map((store) =>
    <StoreCard store={store}/>)}
    </div>
  );
};

export default StoreCarousel;
