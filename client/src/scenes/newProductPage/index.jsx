import Form from "./Form";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import styles from "./newProductPage.module.css";

const NewProductPage = () => {
  return (
    <>
      <Navbar />

      <div className={styles.container}>
        <div className={styles.contentContainer}>
            <Form />
        </div>
      </div>
      <Footer />
    </>
  );
};


export default NewProductPage;
