import Form from "./Form";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import styles from "./loginPage.module.css";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <>
    <Navbar/>
      <div className={styles.container}>
        <div  className={`${styles.dataContainer} shadow`}>
          <Form />
        </div>
      </div>
    </>
  );
};

export default LoginPage;


//          <img className={styles.logo} src="/assets/logo.png" alt="" onClick={() => navigate('/')} />
