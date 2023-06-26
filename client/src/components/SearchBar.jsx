import styles from "./SearchBar.module.css";
import { Search } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SearchBar = () => {
  var oldQuery = useParams();
  const [query, setQuery] = useState(oldQuery.query);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/cerca/" + query);
  };

  return (
    <form method="get" action="search.html" className={styles.searchContainer}>
      <input
        type="text"
        value={query}
        placeholder="Cosa stai cercando?"
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" onClick={handleClick}>
        <div>
          <Search />
        </div>
      </button>
    </form>
  );
};

export default SearchBar;
