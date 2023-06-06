import Form from "./Form";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import styles from "./loginPage.module.css";

const LoginPage = () => {
  return (
    <>
      <div className={styles.container}>
        <div  className={`${styles.dataContainer} shadow`}>
          <img className={styles.logo} src="/assets/logo.png" alt="" />
          <Form />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
