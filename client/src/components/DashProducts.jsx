import styles from "./DashProducts.module.css";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import NewProductForm from "components/ProductForm";

const DashProducts = (props) => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);

  const [products, setProducts] = useState("");
  const [type, setType] = useState("productView");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    brand: "",
    shippingCost: "",
    shopID: props.storeID,
    tags: "",
    options: "",
    pictures: "",
  });
  useEffect(() => {
    getMyProducts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmitEdit = (event) => {
    event.preventDefault();
    editProduct(type._id);
  };

  const editProduct = async (id) => {
    var values=formData
    values={
      ...values,
      productID: id
    }
    console.log("values",values)
    const savedProductResponse = await fetch(
      "http://localhost:3001/products/editProduct",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      }
    );
    const savedProduct = await savedProductResponse.json();
  };
  const getMyProducts = async () => {
    const response = await fetch(
      `http://localhost:3001/products/store/${props.storeID}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    setProducts(data);
  };

  const deleteProduct = async (id) => {
    const response = await fetch(
      `http://localhost:3001/products/deleteProduct/${id}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    setProducts(data);
  };

  return (
    <>
      <div className={styles.container}>
        {type == "productView" && (<>
                  <button
                  className="mainButtonGreen"
                  onClick={() => {
                    setType("new");
                  }}
                >
                  Crea Nuovo
                </button>
          <div className={styles.productsContainer}>
            {products == "" ? (
              <div>nessun prodotto inserito</div>
            ) : (
              products.map((product) => {
                return (
                  <div className={styles.product}>
                    <a href="/" className={styles.name}>
                      {product.name}
                    </a>
                    <div className={styles.actions}>
                      <button
                        className="mainButtonYellow"
                        onClick={() => {
                          setType(product);
                          setFormData(product)
                        }}
                      >
                        modifica
                      </button>
                      <button
                        className="mainButtonRed"
                        onClick={() => {
                          deleteProduct(product._id);
                        }}
                      >
                        elimina
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div></>
        )}
        {type == "new" && <NewProductForm/>}
        {(type!="new"&&type!="productView")&&
        
          <div className={styles.formContainer}>
            <form onSubmit={handleSubmitEdit}>
              <input
                type="text"
                value={formData.name}
                placeholder="nome"
                name="name"
                onChange={handleChange}
              />
              <input
                type="text"
                value={formData.description}
                placeholder="descrizione"
                name="description"
                onChange={handleChange}
              />
              <input
                type="text"
                value={formData.brand}
                placeholder="marca"
                name="brand"
                onChange={handleChange}
              />
              <input
                type="text"
                value={formData.tags}
                placeholder="tags (separa con',')"
                name="tags"
                onChange={handleChange}
              />
              <input
                type="text"
                value={formData.options}
                placeholder="options (separa con',')"
                name="options"
                onChange={handleChange}
              />
              <input
                type="text"
                value={formData.price}
                placeholder="prezzo"
                name="price"
                onChange={handleChange}
              />
              <input
                type="text"
                value={formData.shippingCost}
                placeholder="costi di spedizione"
                name="shippingCost"
                onChange={handleChange}
              />
              <div className={styles.actions}>
                <button
                  className="mainButtonRed"
                  onClick={() => {
                    setType("productView");
                  }}
                >
                  annulla
                </button>
                <button type="submit" className="mainButtonGreen">
                  modifica
                </button>
              </div>
            </form>
          </div>
        }
      </div>
    </>
  );
};

export default DashProducts;
