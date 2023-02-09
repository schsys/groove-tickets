import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { clearFilters, getProducts } from "../../redux/actions";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { IconName } from "react-icons/fa";
import Search from "../SearchBar/Search";
import "./Navbar.css";
import Logo from "../../assets/LogoYazz.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();

  function handleOnClickShows() {
    dispatch(clearFilters());
    dispatch(getProducts());
  }
  const [count, setCount] = React.useState(1);
  return (
    <div className="navbar">
      <div className="nav_logo">
        <Link to="/">
          <img className="navbar_logo_img" src={Logo} alt="" />
        </Link>
      </div>
      <div className={`nav_items ${isOpen && "open"}`}>
        <Link
          // to={"/shows"}
          to={"/"}
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
                <Badge
                  color="secondary"
                  badgeContent={count}
                  onClick={() => {
                    setCount(Math.max(count - 1, 0));
                  }}
                >
                  <ShoppingCartIcon />
                </Badge>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Navbar;
