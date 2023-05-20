import styles from "./newProfilePage.module.css";
import { StoreIcon, PersonIcon } from "@mui/icons-material";
import Navbar from "components/Navbar";
import { useNavigate } from "react-router-dom";
import Footer from "components/Footer";
const NewProfilePage = () => {
    const navigate = useNavigate();

  return (
    <>

    <Navbar/>
    <div className={styles.container}>
      <div className={styles.title}>Scegli la tipologia di account da creare:</div>
      <div className={styles.containerOptions}>
        <div className={styles.option} onClick={() => navigate('/creaNegozio')}>
          <div>
            <div className={styles.icon}>🏪</div>
            <div className={styles.text}>Negozio</div>
          </div>
        </div>
        <div className={styles.option} onClick={() => navigate('/login')}>
          <div>
            <div className={styles.icon}>🙋‍♂️</div>
            <div className={styles.text}>Utente</div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default NewProfilePage;
