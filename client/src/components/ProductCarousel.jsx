import styles from "./ProductCarousel.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GenericCarousel from "./GenericCarousel";
import Loader from "./Loader";

const ProductCarousel = ({ storeID }) => {
  const [products, setProducts] = useState(null);
  useEffect(() => {
    getProducts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getProducts = async () => {
    var link = "http://localhost:3001/products";
    if (storeID != "") link = "http://localhost:3001/products/store/" + storeID;
    const response = await fetch(link, {
      method: "GET",
    });
    const data = await response.json();
    setProducts(data);
  };

  return (<>
      {!products ? (<Loader/>)
      :
      (    <GenericCarousel type={"product"} collection={products} title={"I migliori prodotti"}/>
      )
    }
    </>
  );
};

export default ProductCarousel;

