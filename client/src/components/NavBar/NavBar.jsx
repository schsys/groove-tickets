import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleShowCart } from "../../redux/actions";
import { Link } from "react-router-dom";
import { clearFilters, getProducts, getTotalItems } from "../../redux/actions";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
// import { IconName } from "react-icons/fa";
import Search from "../SearchBar/Search";

//import { useSessionStorage } from "../../config/useSessionStorage";

import "./Navbar.css";
import Logo from "../../assets/LogoYazz.png";
import { UserAuth } from "../../context/AuthContext";

const Navbar = ({ isCartDisabled = false }) => {
  //const [authorizedUser] = useSessionStorage("accessToken");
  const { user } = UserAuth();
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

  React.useEffect(() => {
    dispatch(getTotalItems());
    //    setAvailableStock(product.Stock);
    //La línea de código en formato comentado que estás debajo de este comentario deshabilita específicamente la regla "react-hooks/exhaustive-deps. No borrar por favor.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const cart = useSelector((state) => state.cart);
  // const [showCart, setShowCart] = useState(false);

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

        {/* {authorizedUser ? ( */}
        {user ? (
          <div className="nav_username">
            <Link to='/micuenta' className="navbar_menu_link" >MI CUENTA</Link>
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
        <Badge
          color="info"
          badgeContent={totalItems}
          onClick={handleBadgeClick}
        >
          <ShoppingCartIcon style={{ color: "white" }} cursor={isCartDisabled ? 'default' : 'pointer'} />
        </Badge>
      </div>
    </div>
  );
};
export default Navbar;
