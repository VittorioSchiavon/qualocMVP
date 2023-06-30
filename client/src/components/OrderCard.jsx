import styles from "./OrderCard.module.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Badge from "./Badge";
import ProductBadge from "./ProductBadge";

const OrderCard = ({ order, type }) => {
  const navigate = useNavigate();
  //var storeId = useParams();
  const [user, setUser] = useState(null);
  const [store, setStore] = useState(null);
  const [products, setProducts] = useState([]);
  const [orderState, setOrderState] = useState(order);
  const [date, setDate] = useState(new Date(order.updatedAt));
  const [short, setShort] = useState(true);

  const userAccount = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  useEffect(() => {
    //getOrder();
    getClient();
    getProducts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getProducts = async () => {
    for await (const product of orderState.products) {
      var link = "http://localhost:3001/products/" + product.productID;
      const response = await fetch(link, {
        method: "GET",
      });

      const data = await response.json();

      product.name = data.product.name;
      product.picture = data.product.picture;
      setProducts([...products, product]);
      setStore(data.store);
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
    orderState.status = newStatus;
    console.log("ordini", data);
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
      {short ? (
        <div className={styles.container}>
          <div
            onClick={() => {
              setShort(!short);
            }}
            className={styles.showMore}
          >
            {short ? "mostra di più v" : "mostra di meno ^"}
          </div>

          {type == "client" ? (
            <Badge
              name={store?.name}
              path={store?._id}
              image={store?.picture[0]}
            />
          ) : (
            <Badge
              name={user?.firstName + " " + user?.lastName}
              image={user?.picturePath}
            />
          )}
          <div className={styles.numProduct}>
            {orderState.products.length} prodotti
          </div>
          <div className={styles.statusContainer}>
            {order.status == "created" && (
              <div className={styles.status}>In attesa di conferma</div>
            )}
            {order.status == "confirmed" && (
              <div className={styles.status}>In elaborazione</div>
            )}
            {order.status == "delivered" && (
              <div className={styles.status}>Spedito</div>
            )}
            {order.status == "completed" && (
              <div className={styles.status}>Completato</div>
            )}
          </div>
        </div>
      ) : (
        <div className={styles.container}>
          <div
            onClick={() => {
              setShort(!short);
            }}
            className={styles.showMore}
          >
            {short ? "mostra di più v" : "mostra di meno ^"}
          </div>
          <div>
            {type == "client" ? (
              <Badge
                name={store?.name}
                path={store?._id}
              />
            ) : (
              <Badge
                name={user?.firstName + " " + user?.lastName}
                image={user?.picturePath}
              />
            )}
          </div>
          <div className={styles.date}>
            ultimo aggiornamento: {date.toLocaleString()}
          </div>
          <div className={styles.statusContainer}>
            {order.status == "created" && (
              <div className={styles.status}>In attesa di conferma</div>
            )}
            {order.status == "confirmed" && (
              <div className={styles.status}>In elaborazione</div>
            )}
            {order.status == "delivered" && (
              <div className={styles.status}>Spedito</div>
            )}
            {order.status == "completed" && (
              <div className={styles.status}>Completato</div>
            )}
          </div>

          <div className={styles.productList}>
            {products?.map((prod) => (
              <ProductBadge product={prod} />
            ))}
          </div>
          {type == "store" && (
            <div className={styles.actionList}>
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
            <div className={styles.actionList}>
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
      )}
    </>
  );
};

export default OrderCard;
