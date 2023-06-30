import styles from "./searchPage.module.css";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import ProductCard from "components/ProductCard";
import GenericCarousel from "components/GenericCarousel";
import GenericDisplay from "components/GenericDisplay";

const SearchPage = () => {
  const navigate = useNavigate();

  var params = useParams();


  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getProducts = async () => {
    const response = await fetch(
      "http://localhost:3001/search/" + params.query,
      {
        method: "GET",
      }
    );
    const data = await response.json();

    setProducts(data);
  };

  return (
    <>
      <Navbar />
      <div className={styles.title}>risultati per: "{params.query}"</div>
      {products.length!=0?
      <GenericDisplay type={"product"} collection={products} title={""}/>
        :
      <div>no products</div>
      }
      
      <Footer />
    </>
  );
};

export default SearchPage;
