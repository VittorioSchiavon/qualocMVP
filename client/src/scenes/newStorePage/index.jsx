import Form from "./Form";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import styles from "./newStorePage.module.css";

const NewStorePage = () => {
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div  className={`${styles.dataContainer} shadow`}>
          <Form />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NewStorePage;
