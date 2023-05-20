import Form from "./Form";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import styles from "./loginPage.module.css";

const LoginPage = () => {
  return (
    <>
      <Navbar />

      <div className={styles.container}>
        <div className={styles.contentContainer}>
          <div className={styles.left}>
            <div className={styles.text}>
              <img className={styles.logo} src="/assets/logo.png" alt="" />
              <div className={styles.motto}>
                la bellezza del commercio locale,<br></br>
                la comodità dello shopping online
              </div>
            </div>
            <img className={styles.icon} src="/assets/flaticon2.png" alt="" />
          </div>
          <div className={styles.right}>
            <Form />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;
