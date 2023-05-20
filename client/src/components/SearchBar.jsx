import styles from "./SearchBar.module.css";
import { Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/search"+"lol");
  };

  return (
    <form
      method="get"
      action="search.html"
      className={styles.searchContainer}
    >
      <input type="text" placeholder="cerca..." />
      <button type="submit" onClick={handleClick}>
        <div>
          <Search />
        </div>
      </button>
    </form>
  );
};

export default SearchBar;
