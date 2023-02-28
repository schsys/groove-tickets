import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleShowCart } from "../../redux/actions";
import { Link, useLocation } from "react-router-dom";
import { clearFilters, getProducts, getTotalItems } from "../../redux/actions";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import { IconName } from "react-icons/fa";
import Search from "../SearchBar/Search";

//import { useSessionStorage } from "../../config/useSessionStorage";

import "./Navbar.css";
import Logo from "../../assets/LogoYazz.png";
import { UserAuth } from "../../context/AuthContext";

const Navbar = ({ isCartDisabled = false }) => {
  //const [authorizedUser] = useSessionStorage("accessToken");
  const { user } = UserAuth();
  const [activeLink, setActiveLink] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  // const [loggedIn, setLoggedIn] = useState(false);
  // const [username, setUsername] = useState("");
  const dispatch = useDispatch();

  const totalItems = useSelector((state) => state.totalItems);

  function handleOnClickShows() {
    dispatch(clearFilters());
    dispatch(getProducts());
  }
  function handleBadgeClick() {
    if (!isCartDisabled) {
      dispatch(toggleShowCart(true));
    }
  }

  useEffect(() => {
    dispatch(getTotalItems(user));
    //    setAvailableStock(product.Stock);
    //La línea de código en formato comentado que estás debajo de este comentario deshabilita específicamente la regla "react-hooks/exhaustive-deps.
    //No borrar por favor.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalItems, user]);

  // const cart = useSelector((state) => state.cart);
  // const [showCart, setShowCart] = useState(false);

  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="navbar">
      <div className="nav_logo">
        <Link to="/">
          <img className="navbar_logo_img" src={Logo} alt="" />
        </Link>
      </div>
      <div className={`nav_items ${isOpen && "open"}`}>
        <Link
          to={"/oldshows"}
          onClick={handleOnClickShows}
          //className="navbar_menu_link"
          className={isActive('/oldshows') ? 'navbar_menu_link_active' : 'navbar_menu_link'}
        >
          HISTÓRICOS
        </Link>

        <Link
          to={"/"}
          onClick={handleOnClickShows}
          className={isActive('/') ? 'navbar_menu_link_active' : 'navbar_menu_link'}
        >
          SHOWS
        </Link>

        {/* <Link to={"/shop"} className="navbar_menu_link">TIENDA</Link>
              <Link to={"/lessons"} className="navbar_menu_link">CLASES</Link> */}
      </div>
      <div
        className={`nav_toggle ${isOpen && "open"}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className="navbar_search_div">
        <Search />
      </div>

      <div className="nav_right">
        <Badge
          color="info"
          badgeContent={totalItems}
          onClick={handleBadgeClick}
        >
          <ShoppingCartIcon
            className="right_navbar_icons"
            style={{ color: "white" }}
            cursor={isCartDisabled ? "default" : "pointer"}
          />
        </Badge>
        {/* {authorizedUser ? ( */}
        {user ? (
          <div className="nav_username">
            <Link to="/micuenta" className="navbar_menu_link">
              <AccountCircleIcon className="right_navbar_icons" />
            </Link>
          </div>
        ) : (
          <div className="nav_btn_logged">
            <div className="nav_login_btns">
              <Link to={"/register"} className="navbar_menu_link">
                INGRESAR
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Navbar;
