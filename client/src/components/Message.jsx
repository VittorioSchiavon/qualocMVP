import styles from "./Message.module.css";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PopupContext } from "App";


const Message = ({ message, own }) => {
  var date = new Date(message.createdAt);  // dateStr you get from mongodb
var d = date.getDate();
var m = date.getMonth()+1
var h = date.getHours()
var min = date.getMinutes()
const token = useSelector((state) => state.token);
const [popup, setPopup] = useContext(PopupContext);


const [product, setProduct] = useState(null);

useEffect(() => {
  if(message.type=="product") getProduct();
}, []); // eslint-disable-line react-hooks/exhaustive-deps
const getProduct = async () => {
  const response = await fetch(
    `http://localhost:3001/products/${message.text}`,
    {
      method: "GET",
    }
  );
  const data = await response.json();
  setProduct(data.product);
};

const addToCart = async () => {
  const values = {
    productID: product._id,
    quantity: 1,
    option: "",
    price: product.price,
  };

  const savedStoreResponse = await fetch(
    "http://localhost:3001/carts/addProduct",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    }
  );
  const savedStore = await savedStoreResponse.json();
  setPopup({ type: "success", message: "prodotto aggiunto al carrello!" });
};

  return  (
    <div className={own ? styles.myMessage: styles.message}>
      <div className={styles.messageTop}>
        {message.type=="image" &&
                  <img
                  src={"http://localhost:3001/assets/" + message.text}
                  className={styles.messageImage}
                  alt={message.text}
                />
  }
    {message.type=="product" &&
    <div className={styles.tempProductContainer}>
        <div className={styles.tempProductName}>{product?.name}</div>
        <div className={styles.price}>
            {product?.price + "€ "}{" "}
            <span className={styles.shippingCost}>
              (+{product?.shippingCost + "€ spedizione"})
            </span>
          </div>
          <button className={styles.addToCart} onClick={addToCart}>
            <svg
              className={styles.addToCartIcon}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2.5 4.25a.75.75 0 0 1 .75-.75h.558c.95 0 1.52.639 1.845 1.233.217.396.374.855.497 1.271A1.29 1.29 0 0 1 6.25 6h12.498c.83 0 1.43.794 1.202 1.593l-1.828 6.409a2.75 2.75 0 0 1-2.644 1.996H9.53a2.75 2.75 0 0 1-2.652-2.022l-.76-2.772-1.26-4.248-.001-.008c-.156-.567-.302-1.098-.52-1.494C4.128 5.069 3.96 5 3.809 5H3.25a.75.75 0 0 1-.75-.75ZM9 21a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM16 21a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
            </svg>
            Aggiungi al carrello
          </button>
        </div>
        }
  {message.type=="" &&
        <p className={styles.messageText}>{message.text}</p>
        }

      </div>
      <div className={styles.messageBottom}>{d + "/"+ m + " "+ h + ":" + min}</div>
    </div>
  );
};

export default Message;