import { useEffect, useState } from "react";
import GenericCarousel from "./GenericCarousel";

const StoreCarousel = () => {
  const [stores, setStores] = useState(null);
  useEffect(() => {
    getStores();
  }, []);

  const getStores = async () => {
    const response = await fetch(`http://localhost:3001/stores`, {
      method: "GET",
    });
    const data = await response.json();
    setStores(data);
  };

  if (!stores) return null;
  console.log(stores)
  return (
    <GenericCarousel type={"store"} collection={stores} title={"I migliori negozi della tua zona"}/>
  );
};

export default StoreCarousel;
