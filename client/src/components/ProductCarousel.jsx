import styles from "./StoreCarousel.module.css";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import ProductCard from "./ProductCard";

const ProductCarousel = () => {
  const navigate = useNavigate();
  //var storeId = useParams();
  const [products, setProducts] = useState(null);

  useEffect(() => {
    getProducts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getProducts = async () => {
    const response = await fetch(`http://localhost:3001/products`, {
      method: "GET",
    });
    const data = await response.json();
    setProducts(data);
  };

  if (!products) return null;
  console.log(products)
  return (
    <div className={styles.container}>
    {products.map((product) =>
    <ProductCard product={product}/>)}
    </div>
  );
};

export default ProductCarousel;
