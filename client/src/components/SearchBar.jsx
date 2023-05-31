import styles from "./SearchBar.module.css";
import { Search } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  const navigate = useNavigate();
  const handleClick = () => {
    
    navigate("/cerca/"+ query);
  };

  return (
    <form
      method="get"
      action="search.html"
      className={styles.searchContainer}
    >
      <input type="text" value={query}  placeholder="cerca..." onChange={(e) => setQuery(e.target.value)
    } />
      <button type="submit" onClick={handleClick} > 
        <div>
          <Search />
        </div>
      </button>
    </form>
  );
};

export default SearchBar;
