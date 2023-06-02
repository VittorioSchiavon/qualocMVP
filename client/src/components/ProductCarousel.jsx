import styles from "./ProductCarousel.module.css";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import ProductCard from "./ProductCard";

const ProductCarousel = ({storeID}) => {
  const navigate = useNavigate();
  //var storeId = useParams();
  const [products, setProducts] = useState(null);

  useEffect(() => {
    getProducts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getProducts = async () => {
    var link="http://localhost:3001/products"
    if (storeID!="") link = "http://localhost:3001/products/store/"+storeID
    const response = await fetch(link, {
      method: "GET",
    });
    const data = await response.json();
    setProducts(data);
  };

  if (!products) return null;
  return (
    <div className={styles.container}>
      <div className="mainTitle">I Migliori Prodotti</div>
    {products.map((product) =>
    <ProductCard product={product}/>)}
    </div>
  );
};

export default ProductCarousel;
