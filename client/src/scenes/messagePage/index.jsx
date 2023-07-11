import styles from "./messagePage.module.css";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const MessagePage = ({message}) => {
  useEffect(() => {
    document.title = "qualoc";  

  }, []);
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      {message=="404"?(<div className={styles.container}><div className={styles.negativeMex}>

        errore 404: pagina non trovata
      </div>
      <a className={styles.link} onClick={()=>navigate("/")}>vai alla homepage</a></div>):(<></>)}


      {message=="successo"?(<div className={styles.container}><div className={styles.positiveMex}>

Operazione eseguita con successo!
</div>
<a className={styles.link} onClick={()=>navigate("/")}>vai alla homepage</a></div>):(<></>)}

{message=="fallimento"?(<div className={styles.container}><div className={styles.negativeMex}>

Abbiamo riscontrato dei problemi. Operazione Fallita.
</div>
<a  className={styles.link} onClick={()=>navigate("/")}>vai alla homepage</a></div>):(<></>)}
      <Footer />
    </>
  );
};

export default MessagePage;
