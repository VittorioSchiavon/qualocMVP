import Navbar from "components/Navbar";
import Footer from "components/Footer";
import styles from "./cartPage.module.css";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CartProduct from "components/CartProduct";
import { PopupContext } from "App";
import ProductCarousel from "components/ProductCarousel";

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const token = useSelector((state) => state.token);
  const [popup, setPopup] = useContext(PopupContext);

  useEffect(() => {
    document.title = 'qualoc Carrello';
    getCart();
    setTot();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setTot();
  }, [cart]);
  const getCart = async () => {
    const response = await fetch(`http://localhost:3001/carts/`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setCart(data);
    setTot();
  };

  const checkout = async () => {
    const response = await fetch("http://localhost:3001/checkout/", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    console.log(data);
    window.location = data.url;
  };

  const setTot = () => {
    var tot = 0;
    cart?.products.map((prod) => {
      tot = tot + prod.price * prod.quantity;
    });
    setTotalPrice(tot);
  };

  const removeProduct = async (prod) => {
    const savedStoreResponse = await fetch(
      "http://localhost:3001/carts/removeProduct",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(prod),
      }
    );
    if (savedStoreResponse.statusText != "OK")
      setPopup({ type: "error", message: "operazione non riuscita" });
    if (savedStoreResponse.statusText == "OK") {
      setPopup({ type: "success", message: "Prodotto rimosso dal carrello" });
      getCart();
    }
  };

  if (!cart) return;

  return (
    <>
      <Navbar />

      <div className={styles.container}>
        <div className={styles.title}>
          Carrello ({cart?.products?.length}{" "}
          {cart?.products?.length == 1 ? "prodotto" : "prodotti"})
        </div>
        <div className={styles.contentContainer}>
          {cart?.products.length != 0 ? (
            cart?.products.map((prod) => {
              return (
                <CartProduct product={prod} removeProduct={removeProduct} />
              );
            })
          ) : (
            <div className={styles.noProd}>nessun prodotto nel carrello</div>
          )}
          {cart?.products.length != 0 && (
            <>
              <div className={styles.tot}>totale: {totalPrice} €</div>
              <button id={styles.checkout} className="cta" onClick={checkout}>
                Procedi all'acquisto
              </button>
            </>
          )}
        </div>
      </div>
      <div>
        <ProductCarousel storeID={""} />
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
