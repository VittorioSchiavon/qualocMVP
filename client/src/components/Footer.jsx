import styles from "./Footer.module.css";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/search" + "lol");
  };

  return (
    <footer>
      <svg
        id={styles.svgFooter}
        viewBox="0 0 1440 170"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="rgb(49,133,30)"
          d="M0,85L24,82.2C48,79,96,74,144,62.3C192,51,240,34,288,36.8C336,40,384,62,432,59.5C480,57,528,28,576,14.2C624,0,672,0,720,11.3C768,23,816,45,864,45.3C912,45,960,23,1008,19.8C1056,17,1104,34,1152,39.7C1200,45,1248,40,1296,53.8C1344,68,1392,102,1440,107.7C1488,113,1536,91,1584,85C1632,79,1680,91,1728,104.8C1776,119,1824,136,1872,141.7C1920,147,1968,142,2016,133.2C2064,125,2112,113,2160,93.5C2208,74,2256,45,2304,53.8C2352,62,2400,108,2448,107.7C2496,108,2544,62,2592,48.2C2640,34,2688,51,2736,53.8C2784,57,2832,45,2880,59.5C2928,74,2976,113,3024,119C3072,125,3120,96,3168,90.7C3216,85,3264,102,3312,110.5C3360,119,3408,119,3432,119L3456,119L3456,170L3432,170C3408,170,3360,170,3312,170C3264,170,3216,170,3168,170C3120,170,3072,170,3024,170C2976,170,2928,170,2880,170C2832,170,2784,170,2736,170C2688,170,2640,170,2592,170C2544,170,2496,170,2448,170C2400,170,2352,170,2304,170C2256,170,2208,170,2160,170C2112,170,2064,170,2016,170C1968,170,1920,170,1872,170C1824,170,1776,170,1728,170C1680,170,1632,170,1584,170C1536,170,1488,170,1440,170C1392,170,1344,170,1296,170C1248,170,1200,170,1152,170C1104,170,1056,170,1008,170C960,170,912,170,864,170C816,170,768,170,720,170C672,170,624,170,576,170C528,170,480,170,432,170C384,170,336,170,288,170C240,170,192,170,144,170C96,170,48,170,24,170L0,170Z"
        ></path>
      </svg>
      <div className={styles.container}>
        <div className={styles.column}>
          <h3>Company</h3>
          <ul>
            <li>
              <a href="#">About Us</a>
            </li>
            <li>
              <a href="#">Careers</a>
            </li>
            <li>
              <a href="#">Press</a>
            </li>
            <li>
              <a href="#">Affiliates</a>
            </li>
          </ul>
        </div>
        <div className={styles.column}>
          <h3>Customer Service</h3>
          <ul>
            <li>
              <a href="#">Contact Us</a>
            </li>
            <li>
              <a href="#">Returns & Exchanges</a>
            </li>
            <li>
              <a href="#">Shipping & Delivery</a>
            </li>
            <li>
              <a href="#">FAQ</a>
            </li>
          </ul>
        </div>
        <div className={styles.column}>
          <h3>Connect with Us</h3>
          <ul>
            <li>
              <a href="#">Facebook</a>
            </li>
            <li>
              <a href="#">Twitter</a>
            </li>
            <li>
              <a href="#">Instagram</a>
            </li>
            <li>
              <a href="#">Pinterest</a>
            </li>
          </ul>
        </div>
        <div className={styles.column}>
          <h3>Join Our Mailing List</h3>
          <form>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email address"
            />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>&copy; 2023 Example E-Commerce. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
