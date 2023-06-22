import styles from "./OrderCard.module.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const OrderCard = ({ order, type }) => {
  const navigate = useNavigate();
  //var storeId = useParams();
  const [user, setUser] = useState(null);
  const [store, setStore] = useState(null);
  const [products, setProducts] = useState([]);
  const [date, setDate] = useState(new Date(order.updatedAt));

  const userAccount = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  useEffect(() => {
    //getOrder();
    getStore();
    getClient();
    getProducts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getProducts = async () => {
    for await (const product of order.products) {
      var link = "http://localhost:3001/products/" + product.productID;
      const response = await fetch(link, {
        method: "GET",
      });

      const data = await response.json();
      product.name = data.name;
      setUser(user);
      //tempProd = [...tempProd, data];
    }
  };

  const changeStatusOrder = async (newStatus) => {
    var link =
      `http://localhost:3001/orders/changeStatusOrder/` +
      order._id +
      "/" +
      newStatus;
    const response = await fetch(link, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    order.status = newStatus;
    console.log("ordini", data);
  };

  const getStore = async () => {
    const response = await fetch(
      `http://localhost:3001/stores/${order.shopID}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    setStore(data);
  };

  const getClient = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${order.clientID}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    setUser(data);
  };

  return (
    <>
      <div className={styles.container}>
        <div>
          {type == "client" ? (
            <div className={styles.storeName}>{store?.name}</div>
          ) : (
            <div className={styles.userInfo}>
              <div className={styles.userName}>
                {user?.firstName + " " + user?.lastName}
              </div>
              <div className={styles.address}>{order?.address}</div>
            </div>
          )}
          <div className={styles.date}>ultimo aggiornamento: {date.toLocaleString()}</div>
        </div>

        <div className={styles.productList}>
          {order.products?.map((prod) => (
            <div>
              <span className={styles.name}>{prod.name} </span>
              <span className={styles.info}>
                (qnt:{prod.quantity} - opz: "{prod.option}" - prezzo:{" "}
                {prod.price})
              </span>
            </div>
          ))}
        </div>
        <div className={styles.statusContainer}>
          
        {order.status == "created" && (
              <div className={styles.status}>Ordine Creato</div>
            )}
                    {order.status == "confirmed" && (
              <div className={styles.status}>Ordine Confermato</div>
            )}
                    {order.status == "delivered" && (
              <div className={styles.status}>Ordine Spedito</div>
            )}
                    {order.status == "completed" && (
              <div className={styles.status}>Ordine Completato</div>
            )}

        </div>
        {type == "store" && (
          <div>
            {order.status == "created" && (
              <button
                className="mainButtonGreen"
                onClick={() => {
                  changeStatusOrder("confirmed");
                }}
              >
                conferma
              </button>
            )}
            {order.status == "created" && (
              <button
                className="mainButtonRed"
                onClick={() => {
                  changeStatusOrder("cancelled");
                }}
              >
                cancella
              </button>
            )}

            {order.status == "confirmed" && (
              <button
                className="mainButtonGreen"
                onClick={() => {
                  changeStatusOrder("delivered");
                }}
              >
                notifica avvenuta spedizione
              </button>
            )}

            {order.status == "delivered" && (
              <div>
                In attesa che il cliente confermi la ricezione dell'ordine
              </div>
            )}
          </div>
        )}
        {type == "client" && (
          <div>
            {order.status == "delivered" && (
              <button
                className="mainButtonGreen"
                onClick={() => {
                  changeStatusOrder("completed");
                }}
              >
                conferma avvenuta spedizione
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default OrderCard;
