import { useContext } from "react";
import styles from "./Popup.module.css";
import { PopupContext } from "App";
const Popup = ({ type, message, handler }) => {
  const [popup, setPopup] =useContext(PopupContext)
  function close(){
    setPopup({...popup, type:null, message: null})
  }
  setTimeout(close, 5000)
  function getPopup() {
    switch (type) {
      case "info":
        return (
          <div className={styles.container}>
            <div className={`${styles.card} ${styles.info}`}>
              <svg className={styles.infoIcon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 1.999c5.524 0 10.002 4.478 10.002 10.002 0 5.523-4.478 10.001-10.002 10.001-5.524 0-10.002-4.478-10.002-10.001C1.998 6.477 6.476 1.999 12 1.999Zm-.004 8.25a1 1 0 0 0-.992.885l-.007.116.003 5.502.007.117a1 1 0 0 0 1.987-.002L13 16.75l-.003-5.501-.007-.117a1 1 0 0 0-.994-.882ZM12 6.5a1.251 1.251 0 1 0 0 2.503A1.251 1.251 0 0 0 12 6.5Z"/></svg>
              <div className={styles.message}><span className={styles.label}>Info:</span> {message}</div>
              <button onClick={close} className={styles.closeButton}>X</button>
            </div>
          </div>
        );
      case "error":
        return (
          <div className={styles.container}>
            <div className={`${styles.card} ${styles.error}`}>
              <svg className={styles.errorIcon} xmlns="http://www.w3.org/2000/svg" id="mdi-close-circle" viewBox="0 0 24 24"><path d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z" /></svg>
              <div className={styles.message}><span className={styles.label}>Errore:</span>  {message}</div>
              <button onClick={close} className={styles.closeButton}>X</button>
            </div>
          </div>
        );
      case "warning":
        return (
          <div className={styles.container}>
            <div className={`${styles.card} ${styles.warning}`}>
              <svg className={styles.warningIcon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M10.909 2.782a2.25 2.25 0 0 1 2.975.74l.083.138 7.759 14.009a2.25 2.25 0 0 1-1.814 3.334l-.154.006H4.242A2.25 2.25 0 0 1 2.2 17.812l.072-.143L10.03 3.66a2.25 2.25 0 0 1 .879-.878ZM12 16.002a.999.999 0 1 0 0 1.997.999.999 0 0 0 0-1.997Zm-.002-8.004a1 1 0 0 0-.993.884L11 8.998 11 14l.007.117a1 1 0 0 0 1.987 0l.006-.117L13 8.998l-.007-.117a1 1 0 0 0-.994-.883Z"/></svg>
              <div className={styles.message}><span className={styles.label}>Attenzione:</span>  {message}</div>
              <button onClick={close} className={styles.closeButton}>X</button>
            </div>
          </div>
        );
      case "success":
        return (
          <div className={styles.container}>
            <div className={`${styles.card} ${styles.success}`}>
              <svg className={styles.successIcon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2Zm3.22 6.97-4.47 4.47-1.97-1.97a.75.75 0 0 0-1.06 1.06l2.5 2.5a.75.75 0 0 0 1.06 0l5-5a.75.75 0 1 0-1.06-1.06Z"/></svg>
              <div className={styles.message}><span className={styles.label}>Successo:</span> {message}</div>
              <button onClick={close} className={styles.closeButton}>X</button>
            </div>
          </div>
        );
      default:
        return (
          <div className={styles.container}>
            <div className={`${styles.card} ${styles.info}`}>
              <svg className={styles.infoIcon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 1.999c5.524 0 10.002 4.478 10.002 10.002 0 5.523-4.478 10.001-10.002 10.001-5.524 0-10.002-4.478-10.002-10.001C1.998 6.477 6.476 1.999 12 1.999Zm-.004 8.25a1 1 0 0 0-.992.885l-.007.116.003 5.502.007.117a1 1 0 0 0 1.987-.002L13 16.75l-.003-5.501-.007-.117a1 1 0 0 0-.994-.882ZM12 6.5a1.251 1.251 0 1 0 0 2.503A1.251 1.251 0 0 0 12 6.5Z"/></svg>
              <div className={styles.message}><span className={styles.label}>Info:</span> {message}</div>
              <button onClick={close} className={styles.closeButton}>X</button>
            </div>
          </div>
        );
    }
  }

  return (
    <>{ getPopup() }
    </>)
};

export default Popup;
