import NavbarCSS from "./Navbar.module.css";
import { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
  ShoppingCart
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "state";
import { useNavigate } from "react-router-dom";
import WaveSeparator from "./WaveSeparator";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
 
  const handleClick = () => {
    navigate('/');
  };

  return (
    <div>
      <div id={NavbarCSS.topnav}>
        <img
          src="assets/logo.png"
          alt="logo"
          id={NavbarCSS.logo}
          onClick={handleClick}
        />
        <SearchBar/>

          {user===null ?
           <div className={NavbarCSS.topnavIcons}>
          <button className="mainButtonGreen" onClick={() => navigate('/login')}>Accedi</button>
          <button className="mainButtonGreen" onClick={() => navigate('/selezionaTipologia')}>Registrati</button>
          </div>
          :
          <div className={NavbarCSS.topnavIcons}>
            
          <ShoppingCart onClick={() => navigate('/carrello')} className={NavbarCSS.icons}/>
          <Notifications className={NavbarCSS.icons}/>
          <button className="mainButtonGreen" onClick={() => navigate('/ilMioProfilo')}>{user.firstName}</button>
          </div>}
        </div>
      
      <WaveSeparator/>
    </div>
  );
};

export default Navbar;
