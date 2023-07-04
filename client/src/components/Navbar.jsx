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
              {isNonMobileScreens&& <div className={NavbarCSS.searchBarContainer} ><SearchBar /></div> }

        {user === null ? (
          <div className={NavbarCSS.topnavIcons}>
            <button
              className={NavbarCSS.link}
              onClick={() => navigate("/login")}
            >
              Accedi o Registrati
            </button>
          </div>
        ) : (
          <div className={NavbarCSS.topnavIcons}>
            <button
                className={NavbarCSS.link}
                onClick={() => navigate("/ilMioProfilo")}
            >
               {/*<div className={NavbarCSS.notificationBadge}>5</div> 
              <svg
                className={NavbarCSS.svgIcons}
                xmlns="http://www.w3.org/2000/svg"
                id="mdi-account"
                viewBox="0 0 24 24"
              >
                <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
              </svg>*/}
              Profilo
            </button>
            <button
              onClick={() => navigate("/carrello")}
              className={NavbarCSS.link}
              >Carrello</button>

            {user.isOwner ? (
              <button
                className={NavbarCSS.link}
                onClick={() => {
                  navigate("/ilMioNegozio");
                }}
              >
                Negozio              </button>
            ) : (
              ""
            )}
          </div>
        )}

      </div>
      {!isNonMobileScreens && <div className={NavbarCSS.searchBarContainerMob} ><SearchBar /></div> }


     {/* <WaveSeparator />*/}
      

    </div>
    {user&&<ChatPage/>}
    </>
  );
};

export default Navbar;
