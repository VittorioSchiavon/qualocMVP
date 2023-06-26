import NavbarCSS from "./Navbar.module.css";
import { useState } from "react";
import { useMediaQuery } from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
  ShoppingCart,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "state";
import { useNavigate } from "react-router-dom";
import WaveSeparator from "./WaveSeparator";
import SearchBar from "./SearchBar";
import ChatPage from "scenes/chatPage";

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const handleClick = () => {
    navigate("/");
  };

  return (
    <>
    <div className={NavbarCSS.container}>
      <div className={NavbarCSS.topnav}>
        <img
          src="/assets/logo.png"
          alt="logo"
          id={NavbarCSS.logo}
          onClick={handleClick}
        />
       {isNonMobileScreens&& <SearchBar /> }

        {user === null ? (
          <div className={NavbarCSS.topnavIcons}>
            <button
              className="mainButtonGreen"
              onClick={() => navigate("/login")}
            >
              Accedi o Registrati
            </button>
          </div>
        ) : (
          <div className={NavbarCSS.topnavIcons}>
            <div
              className={NavbarCSS.icons}
              onClick={() => navigate("/ilMioProfilo")}
            >
               <div className={NavbarCSS.notificationBadge}>5</div> 
              <svg
                className={NavbarCSS.svgIcons}
                xmlns="http://www.w3.org/2000/svg"
                id="mdi-account"
                viewBox="0 0 24 24"
              >
                <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
              </svg>
            </div>
            <ShoppingCart
              onClick={() => navigate("/carrello")}
              className={NavbarCSS.icons}
            />

            {user.isOwner ? (
              <button
                className="mainButtonGreen"
                onClick={() => {
                  navigate("/ilMioNegozio");
                }}
              >
<svg  className={NavbarCSS.svgIcons} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M10.495 14.501v7.498H7.498v-7.498h2.996Zm6.76-1.5h-3.502a.75.75 0 0 0-.75.75v3.502c0 .414.336.75.75.75h3.502a.75.75 0 0 0 .75-.75v-3.502a.75.75 0 0 0-.75-.75Zm-.751 1.5v2.002h-2.001v-2.002h2ZM8.166 7.002H3.5v1.165c0 1.18.878 2.157 2.016 2.311l.157.016.16.005c1.234 0 2.245-.959 2.327-2.173l.005-.16V7.003Zm6.165 0H9.666v1.165c0 1.18.878 2.157 2.016 2.311l.157.016.16.005c1.234 0 2.245-.959 2.327-2.173l.005-.16V7.003Zm6.167 0h-4.665v1.165c0 1.18.878 2.157 2.017 2.311l.156.016.16.005c1.235 0 2.245-.959 2.327-2.173l.006-.16-.001-1.164ZM9.06 3.5H6.326L4.469 5.502h3.977L9.06 3.5Zm4.307 0H10.63l-.616 2.002h3.97L13.369 3.5Zm4.305 0h-2.734l.614 2.002h3.977L17.673 3.5ZM2.2 5.742l3.25-3.502a.75.75 0 0 1 .446-.233L6 2h12a.75.75 0 0 1 .474.169l.076.07 3.272 3.53.03.038c.102.136.148.29.148.44L22 8.168c0 .994-.379 1.9-1 2.58V21.25a.75.75 0 0 1-.649.743L20.25 22l-8.254-.001v-8.248a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v8.248L3.75 22a.75.75 0 0 1-.743-.648l-.007-.102V10.748a3.818 3.818 0 0 1-.995-2.384l-.005-.197V6.29a.728.728 0 0 1 .096-.408l.05-.076.054-.065Z"/></svg>
              </button>
            ) : (
              ""
            )}
          </div>
        )}
              {!isNonMobileScreens&& <SearchBar /> }

      </div>


      <WaveSeparator />
      

    </div>
    {user&&<ChatPage/>}
    </>
  );
};

export default Navbar;
