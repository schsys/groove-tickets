import Logo from "./LogoYazz.png";
import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import Search from "../SearchBar/Search";
import { useDispatch } from "react-redux";
import { clearFilters, getProducts } from "../../redux/actions";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();

  function handleOnClickShows() {
    dispatch(clearFilters());
    dispatch(getProducts());
  }

  return (
    <div className="navbar">
      <div className="nav_logo">
        <Link to="/">
          <img className="navbar_logo_img" src={Logo} alt="" />
        </Link>
      </div>
      <div className={`nav_items ${isOpen && "open"}`}>
        <Link
          to={"/shows"}
          onClick={handleOnClickShows}
          className="navbar_menu_link"
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

      <div className="nav_right">
        <Search />
        {loggedIn ? (
          <div className="nav_username">{username}</div>
        ) : (
          <div className="nav_btn_logged">
            <div className="nav_login_btns">
              <Link to={"/micuenta"} className="navbar_menu_link">
                INGRESAR
              </Link>
            </div>
            <div className="nav_cart_btn">
              <Link to={"/carrito"} className="navbar_menu_link">
                <i id="cart-icon_nav" className="fa-solid fa-cart-shopping"></i>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Navbar;
