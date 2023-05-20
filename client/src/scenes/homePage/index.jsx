import Navbar from "components/Navbar.jsx";
import Footer from "components/Footer";
import styles from "./homepage.module.css";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className={styles.firstRow}>
        <div className={styles.leftSection}>
          <div className={styles.motto}>
            la bellezza del commercio locale,<br></br>la comodità dello shopping
            online
          </div>
          <div className={styles.spiegazione}>
            Grazie a qualoc potrai scoprire le migliori offerte, le nuove
            tendenze e le novità dei negozi della tua zona. Scegliendo di
            acquistare presso i nostri partner commerciali, non solo sosterrai i
            piccoli imprenditori locali, ma avrai anche la garanzia di
            acquistare prodotti di alta qualità, pagando un prezzo equo e
            ragionevole.
          </div>
          <button className="mainButtonGreen">Scopri</button>
        </div>
        <div className={styles.rightSection}>
          <img src="/assets/flaticon.png" alt="" />
        </div>
      </div>
      <svg
          id="wave"
          viewBox="0 0 1440 100"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
              <stop stop-color="rgba(49, 133, 30, 1)" offset="0%"></stop>
              <stop stop-color="rgba(49, 133, 30, 1)" offset="100%"></stop>
            </linearGradient>
          </defs>
          <path
            fill="url(#sw-gradient-0)"
            d="M0,80L40,66.7C80,53,160,27,240,13.3C320,0,400,0,480,15C560,30,640,60,720,60C800,60,880,30,960,25C1040,20,1120,40,1200,50C1280,60,1360,60,1440,50C1520,40,1600,20,1680,23.3C1760,27,1840,53,1920,63.3C2000,73,2080,67,2160,61.7C2240,57,2320,53,2400,55C2480,57,2560,63,2640,65C2720,67,2800,63,2880,55C2960,47,3040,33,3120,38.3C3200,43,3280,67,3360,73.3C3440,80,3520,70,3600,70C3680,70,3760,80,3840,75C3920,70,4000,50,4080,50C4160,50,4240,70,4320,66.7C4400,63,4480,37,4560,26.7C4640,17,4720,23,4800,31.7C4880,40,4960,50,5040,45C5120,40,5200,20,5280,20C5360,20,5440,40,5520,51.7C5600,63,5680,67,5720,68.3L5760,70L5760,100L5720,100C5680,100,5600,100,5520,100C5440,100,5360,100,5280,100C5200,100,5120,100,5040,100C4960,100,4880,100,4800,100C4720,100,4640,100,4560,100C4480,100,4400,100,4320,100C4240,100,4160,100,4080,100C4000,100,3920,100,3840,100C3760,100,3680,100,3600,100C3520,100,3440,100,3360,100C3280,100,3200,100,3120,100C3040,100,2960,100,2880,100C2800,100,2720,100,2640,100C2560,100,2480,100,2400,100C2320,100,2240,100,2160,100C2080,100,2000,100,1920,100C1840,100,1760,100,1680,100C1600,100,1520,100,1440,100C1360,100,1280,100,1200,100C1120,100,1040,100,960,100C880,100,800,100,720,100C640,100,560,100,480,100C400,100,320,100,240,100C160,100,80,100,40,100L0,100Z"
          ></path>
        </svg>
      <div className={styles.secondRow}>
          <h1 className={styles.title}>come funziona qualoc?</h1>
          <div className={styles.steps}>
            <div className={styles.step}>
              <div className={styles.num}>🎯</div>
              <div className={styles.text}>trova il prodotto che desideri</div>
            </div>
            <div className={styles.step}>
              <div className={styles.num}>👩‍💻</div>
              <div className={styles.text}>contatta il venditore</div>
            </div>
            <div className={styles.step}>
              <div className={styles.num}>💳</div>
              <div className={styles.text}>procedi con l'acquisto</div>
            </div>
            <div className={styles.step}>
              <div className={styles.num}>📦</div>
              <div className={styles.text}>ricevi a casa il prodotto</div>
          </div><br></br>

        </div>
        <button className="mainButtonGreen"
            onClick={() => window.location="https://www.youtube.com/watch?v=dQw4w9WgXcQ"}
          >
            guarda un tutorial
          </button>

      </div>
      <svg
          className={styles.reverseWave}

          viewBox="0 0 1440 100"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
              <stop stop-color="rgba(49, 133, 30, 1)" offset="0%"></stop>
              <stop stop-color="rgba(49, 133, 30, 1)" offset="100%"></stop>
            </linearGradient>
          </defs>
          <path
            fill="url(#sw-gradient-0)"
            d="M0,80L40,66.7C80,53,160,27,240,13.3C320,0,400,0,480,15C560,30,640,60,720,60C800,60,880,30,960,25C1040,20,1120,40,1200,50C1280,60,1360,60,1440,50C1520,40,1600,20,1680,23.3C1760,27,1840,53,1920,63.3C2000,73,2080,67,2160,61.7C2240,57,2320,53,2400,55C2480,57,2560,63,2640,65C2720,67,2800,63,2880,55C2960,47,3040,33,3120,38.3C3200,43,3280,67,3360,73.3C3440,80,3520,70,3600,70C3680,70,3760,80,3840,75C3920,70,4000,50,4080,50C4160,50,4240,70,4320,66.7C4400,63,4480,37,4560,26.7C4640,17,4720,23,4800,31.7C4880,40,4960,50,5040,45C5120,40,5200,20,5280,20C5360,20,5440,40,5520,51.7C5600,63,5680,67,5720,68.3L5760,70L5760,100L5720,100C5680,100,5600,100,5520,100C5440,100,5360,100,5280,100C5200,100,5120,100,5040,100C4960,100,4880,100,4800,100C4720,100,4640,100,4560,100C4480,100,4400,100,4320,100C4240,100,4160,100,4080,100C4000,100,3920,100,3840,100C3760,100,3680,100,3600,100C3520,100,3440,100,3360,100C3280,100,3200,100,3120,100C3040,100,2960,100,2880,100C2800,100,2720,100,2640,100C2560,100,2480,100,2400,100C2320,100,2240,100,2160,100C2080,100,2000,100,1920,100C1840,100,1760,100,1680,100C1600,100,1520,100,1440,100C1360,100,1280,100,1200,100C1120,100,1040,100,960,100C880,100,800,100,720,100C640,100,560,100,480,100C400,100,320,100,240,100C160,100,80,100,40,100L0,100Z"
          ></path>
        </svg>
      <Footer />
    </div>
  );
};

export default HomePage;
