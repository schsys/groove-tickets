import React from "react";
import "./Footer.css";
import yazzLogo from "./Resources/logo yazz transparente.fw.png";

import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="app_footer-background">
      <div className="app__footer-container">
        <a
          className="footer_logo_div"
          href="/"
        >
          <img src={yazzLogo} alt="logo Yazz" className="app__footer-logo" />
        </a>

        <div className="app__footer-text">
          <a href="/#">Términos y Condiciones</a>
          <a href="/#">Preguntas Frecuentes</a>
          <a href="/#">Sobre Nosotros</a>
          <a href="/#">Log in Admin</a>
          <a href="/#">Contacto</a>
        </div>
        <div className="app__footer-socialcopyright">
          <div className="app__footer-socialcontainer">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram className="app__footer-instagram" />
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
              <FaFacebook className="app__footer-instagram" />
            </a>
          </div>
        </div>
      </div>
      <div className="app__footer-copyright">
        Yazz.com © 2002 - 2023 Reservados todos los derechos
      </div>
    </div>
  );
};

export default Footer;
