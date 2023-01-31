import Logo from "./LogoYazz.png";
import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  return (
    <div className="navbar">
      <div className="nav_logo">
        <Link to="/">
          <img className="navbar_logo_img" src={Logo} alt="" />
        </Link>
      </div>
      <div className={`nav_items ${isOpen && "open"}`}>
        <Link to={"/shows"} className="navbar_menu_link">
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
        <div>
          {loggedIn ? (
            <div className="nav_username">{username}</div>
          ) : (
            <div className="nav_btn_logged">
              <div className="nav_login_btns">
                <Link to={"/micuenta"} className="navbar_menu_link">
                  MI CUENTA
                </Link>
              </div>
              <div className="nav_cart_btn">
                <Link to={"/carrito"} className="navbar_menu_link">
                  <i id="cart-icon" className="fa-solid fa-cart-shopping" ></i>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Navbar;

/*import Logo from "./LogoYazz.png";
import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import MediaQuery from "react-responsive";

function toggleMenu() {
  const menu = document.querySelector(".navbar_menu");
  menu.classList.toggle("active");
}

const NavBar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // detectar cambios en el estado de inicio de sesión y actualizar el navbar en consecuencia
    // ejemplo: comprobar si el usuario está logueado en una API
  }, [loggedIn]);

  return (
    <nav className="navbar">
      <div className="navbar_logo">
        <Link to="/">
          <img className="navbar_logo_img" src={Logo} alt="" />
        </Link>
      </div>
      <MediaQuery maxWidth={600}>
        <button onClick={toggleMenu} className="navbar_toggle">
          <i className="fas fa-bars"></i>
          <i className="fas fa-bars"></i>
          <i className="fas fa-bars"></i>
        </button>
      </MediaQuery>
      
        <div className="navbar_menu">
          <div className="navbar_menu_links">
            <Link to="/shows" className="navbar_menu_link">SHOWS</Link>
            <Link to="/tienda" className="navbar_menu_link">TIENDA</Link>
            <Link to="/clases" className="navbar_menu_link">CLASES</Link>
          </div>
        </div>
        <div className="navbar_right">
          <div>
            {loggedIn ? (
              <div className="username">{username}</div>
            ) : (
              <div className="login_btns">
                <button>REGISTRATE</button>
                <button>INGRESAR</button>
              </div>
            )}
          </div>
        </div>
    </nav>
  );
};

export default NavBar;
*/
