import styles from "./Badge.module.css";
import { useNavigate } from "react-router-dom";

const Badge = ({ name, image, path }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.container} onClick={() => path && navigate(path)} 
      style={{
        cursor: path ? 'pointer' : ''
      }}>
        {image ? (
          <img
            src={"http://localhost:3001/assets/" + image}
            alt=""
            className={styles.image}
          />
        ) : (
          <div className={styles.Icon}>{name[0]}</div>
        )}
        <div className={styles.name}>{name}</div>
      </div>
    </>
  );
};

export default Badge;
