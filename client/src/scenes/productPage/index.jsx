import styles from "./productPage.module.css";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { PopupContext } from "App";
import ReviewsSection from "components/ReviewsSection";
import RatingStars from "components/RatingStars";
import ImageDisplay from "components/ImageDisplay";
import Badge from "components/Badge";
import Loader from "components/Loader";

const ProductPage = () => {
  const navigate = useNavigate();
  var productId = useParams();
  const token = useSelector((state) => state.token);
  const [option, setOption] = useState("");
  const [popup, setPopup] = useContext(PopupContext);
  const [product, setProduct] = useState(null);
  const [store, setStore] = useState(null);
  const [fullDescription, setFullDescription] = useState(false);



  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    document.title = "qualoc Prodotto";  

    getProduct();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {}, [option]);

  const getProduct = async () => {
    const response = await fetch(
      `http://localhost:3001/products/${productId.id}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    setProduct(data.product);
    setStore(data.store);
    setOption(data.product.options[0]);
  };

  const addToCart = async () => {
    const values = {
      productID: product._id,
      quantity: quantity,
      option: option,
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

  if (!product) return null;

  return (
    <>
      <Navbar />
      {!product? <Loader/>:<>
      <div className={styles.container}>
        <div className={styles.tagContainer}>
          {product?.tags.map((tag) => (
            <div
            key={tag}
              className="tag"
              onClick={() => {
                navigate("/cerca/" + tag);

              }}
            >
              {tag}
            </div>
          ))}
        </div>
        <div className={styles.productRow}>
          <ImageDisplay collection={product?.picture} />

          <div className={styles.dataContainer}>
            <RatingStars rating={product.rating} />
            <div className={styles.name}>{product.name}</div>
            <Badge image={store?.picture[0]} name={store?.name} path={"negozio/"+store._id}/>

            <div className={styles.actionContainer}>
              <div className={styles.action}>
                <div className={styles.label}>opzioni:</div>
                <div className={styles.optionContainer}>
                  {product?.options.map((opt) => (
                    <button
                    key={opt}
                      className={styles.optionButton}
                      style={
                        option == opt ? { border: "3px solid var(--main)" } : {}
                      }
                      onClick={() => setOption(opt)}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.action}>
                <div className={styles.label}>quantità:</div>
                <input
                  type="number"
                  value={quantity}
                  className={styles.quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
            </div>
            <div className={styles.price}>
              {product.price + "€ "}{" "}
              <span className={styles.shippingCost}>
                (+{product.shippingCost + "€ spedizione"})
              </span>
            </div>

            <button className="cta" onClick={addToCart}>
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
        </div>
      </div>
      <div className={styles.descriptionContainer}>
        
        {fullDescription ? (
          <div>
                    <div className={styles.descriptionTitle}>Dettagli</div>

            <div className={styles.description}>{product.description}</div>
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
                    <div className={styles.descriptionTitle}>Dettagli</div>

            <div className={styles.description}>
              {product.description.substr(0, 100) + "..."}
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
      </div>
      <ReviewsSection productID={product._id} />
            </>}
      <Footer />
    </>
  );
};

export default ProductPage;
