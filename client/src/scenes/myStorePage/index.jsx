import styles from "./myStorePage.module.css";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RatingStars from "components/RatingStars";
import Badge from "components/Badge";

import SendMessage from "components/SendMessage";
import ImageDisplay from "components/ImageDisplay";
import { useSelector } from "react-redux";
import GenericDisplay from "components/GenericDisplay";
import StoreProduct from "components/StoreProduct";
import OrdersSection from "components/OrdersSection";
const MyStorePage = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const [store, setStore] = useState(null);
  const [products, setProducts] = useState(null);
  const user = useSelector((state) => state.user);

  const [fullDescription, setFullDescription] = useState(false);

  useEffect(() => {
    getStore();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    getProducts();
  }, [store]);
  const getStore = async () => {
    const response = await fetch(`http://localhost:3001/stores/myStore`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setStore(data);
  };

  const getProducts = async () => {
    var link = "http://localhost:3001/products/store/" + store?._id;
    const response = await fetch(link, {
      method: "GET",
    });
    const data = await response.json();
    setProducts(data);
  };

  if (!store) return null;

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.tagContainer}>
          {store.tags != null &&
            store.tags.map((el) => {
              return (
                <div
                  className="tag"
                  onClick={() => {
                    navigate("/cerca/" + el);
                  }}
                >
                  {el}
                </div>
              );
            })}
        </div>
        <div className={styles.storeRow}>
          <ImageDisplay collection={store.picture} />

          <div className={styles.dataContainer}>
            <div className={styles.firstRow}>
              <RatingStars rating={store.rating ? store.rating : 0} />

              <div className={styles.social}>
                <svg
                  className={styles.socialIcon}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                >
                  <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.socialIcon}
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.socialIcon}
                  viewBox="0 0 24 24"
                >
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                </svg>
              </div>
            </div>
            <div className={styles.titlo}>{store.name}</div>
            <Badge
              name={user.firstName + " " + user.lastName}
              image={user?.picturePath}
            />
            <div className={styles.address}>
              {store.street +
                " " +
                store.streetNumber +
                ", " +
                store.city +
                " " +
                store.postalCode}
            </div>
          </div>
        </div>
        {fullDescription ? (
          <div>
            <div className={styles.description}>{store.description}</div>
            <div
              className={styles.showMore}
              onClick={() => {
                setFullDescription(false);
              }}
            >
              Leggi meno
            </div>
          </div>
        ) : (
          <div>
            <div className={styles.description}>
              {store.description.substr(0, 100) + "..."}
            </div>
            <div
              className={styles.showMore}
              onClick={() => {
                setFullDescription(true);
              }}
            >
              Leggi di più
            </div>
          </div>
        )}
        <div className="mainTitle">I miei Prodotti</div>

        <div className={styles.carousel}>
        <button className="mainButtonGreen">+ Aggiungi un Prodotto</button>

          {products?.map((el) => (
            <StoreProduct product={el} />
          ))}
        </div>
        <div className={styles.ordersSection}>
        <OrdersSection type="store"/>

        </div>

      </div>
      <Footer />
    </>
  );
};

export default MyStorePage;
