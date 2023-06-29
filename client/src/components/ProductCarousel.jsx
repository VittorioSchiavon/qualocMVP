import styles from "./ProductCarousel.module.css";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import GenericCarousel from "./GenericCarousel";

const ProductCarousel = ({ storeID }) => {
  const navigate = useNavigate();
  //var storeId = useParams();
  const [products, setProducts] = useState(null);
  const [trans, setTrans] = useState(0);
  useEffect(() => {
    getProducts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const cardWidth = 400;

  const getProducts = async () => {
    var link = "http://localhost:3001/products";
    if (storeID != "") link = "http://localhost:3001/products/store/" + storeID;
    const response = await fetch(link, {
      method: "GET",
    });
    const data = await response.json();
    setProducts(data);
  };

  if (!products) return null;
  return (
    <>
    <GenericCarousel type={"product"} collection={products} title={"I migliori prodotti"}/>
    </>
  );
};

export default ProductCarousel;
