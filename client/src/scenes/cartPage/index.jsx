import Navbar from "components/Navbar";
import Footer from "components/Footer";
import styles from "./cartPage.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "state";
import { useNavigate } from "react-router-dom";

const CartPage = () => {


  const [cart, setCart] = useState(null);
  const token = useSelector((state) => state.token);
  const userId = useSelector((state) => state.user._id);
  useEffect(() => {
    getCart();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getCart = async () => {
    const response = await fetch(`http://localhost:3001/carts/`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setCart(data);

  };

  if(!cart) return

  return (
    <>
      <Navbar />

      <div className={styles.container}>
        <div className={styles.contentContainer}>
          <div>Carrello</div>
          <div>
            {cart.userID }
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
