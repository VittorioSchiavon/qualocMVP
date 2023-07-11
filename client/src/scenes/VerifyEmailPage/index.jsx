import styles from "./VerifyEmailPage.module.css";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const VerifyEmailPage = ({ message }) => {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "qualoc Verifica Email";
  }, []);
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.positiveMex}>Account creato con successo!</div>
        <div className={styles.positiveMexParag}>
          Per proseguire con l'utilizzo del nostro sito web, ti chiediamo
          gentilmente di confermare il tuo indirizzo email.
          <br></br>
          <br></br>
          Ti invitiamo a cliccare sul link che ti è stato inviato via email
          all'indirizzo che hai fornito durante la registrazione. Una volta
          confermato l'indirizzo email, potrai accedere al tuo account e
          sfruttare tutte le funzionalità offerte da qualoc.
          <br></br>
          <br></br>
          Ti consigliamo di controllare anche nella cartella spam o nella posta
          indesiderata nel caso non abbia ancora ricevuto l'email di conferma.
          <br></br>
          <br></br>
          Grazie!
        </div>
        <a className={styles.link} onClick={() => navigate("/login")}>
          effettua l'accesso
        </a>
      </div>

      <Footer />
    </>
  );
};

export default VerifyEmailPage;
