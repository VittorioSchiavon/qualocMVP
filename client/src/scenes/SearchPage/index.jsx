import styles from "./searchPage.module.css";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import GenericDisplay from "components/GenericDisplay";
import Loader from "components/Loader";

const SearchPage = () => {
  const navigate = useNavigate();

  var params = useParams();


  const [products, setProducts] = useState([]);
  const [stores, setStores] = useState([]);
  const [storesGPT, setStoresGPT] = useState([]);



  useEffect(() => {
    getProducts();
    getStores();
    getStoresGPT();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getProducts = async () => {
    const response = await fetch(
      "http://localhost:3001/search/products/" + params.query,
      {
        method: "GET",
      }
    );
    const data = await response.json();

    setProducts(data);
  };
  
  const getStores = async () => {
    const response = await fetch(
      "http://localhost:3001/search/stores/" + params.query,
      {
        method: "GET",
      }
    );
    const data = await response.json();

    setStores(data);
  };

  
  const  getStoresGPT= async () => {
    const response = await fetch(
      "http://localhost:3001/search/storesGPT/" + params.query,
      {
        method: "GET",
      }
    );
    const data = await response.json();

    setStoresGPT(data);
  };


  return (
    <>
      <Navbar />
      <div className={styles.title}>risultati per: "{params.query}"</div>
      {!storesGPT? <Loader/>:
      <GenericDisplay type={"store"} collection={storesGPT} title={"i negozi che vendono la categoria che cerchi"}/>
  }
      {!stores? <Loader/>:
      
      <GenericDisplay type={"store"} collection={stores} title={"i negozi"}/>

      }
      
      {!products? <Loader/>:
      <GenericDisplay type={"product"} collection={products} title={"i prodotti"}/>
      }
      
      {products?.length==0 && stores?.length==0 &&  storesGPT?.length==0 && <div>Non ci sono risultati</div>}
      <Footer />
    </>
  );
};

export default SearchPage;
