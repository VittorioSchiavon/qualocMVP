import styles from "./DashSettings.module.css";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import { useEffect, useState } from "react";
import { useNavigate , useSelector} from "react-router-dom";
import { useParams } from "react-router-dom";

const DashSettings = () => {
  const navigate = useNavigate();
  //var storeId = useParams();
  const [stores, setStores] = useState(null);

  useEffect(() => {
    getStores();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getStores = async () => {
    const response = await fetch(`http://localhost:3001/stores`, {
      method: "GET",
    });
    const data = await response.json();
    setStores(data);
  };

  return (
    <>
    <div>
      setting
    </div>
    </>
  );
};

export default DashSettings;
