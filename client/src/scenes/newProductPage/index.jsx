import Form from "./Form";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import styles from "./newProductPage.module.css";
import { useParams } from "react-router-dom";

const NewProductPage = () => {
  var params = useParams();
  return (
    <>
      <Navbar />

      <div className={styles.container}>
        <div className={`${styles.dataContainer} shadow`}>
            <Form/>
        </div>
      </div>
      <Footer />
    </>
  );
};


export default NewProductPage;
