import React from "react";
import "./Footer.css";
import yazzLogo from "./Resources/logo yazz transparente.fw.png";
import instagramLogo from "./Resources/Instagram - Negative.png";
import facebookLogo from "./Resources/Facebook - Negative.png";

const Footer = () => {
  return (
    <div className="app_footer-background">
      <div className="app__footer-container">
      <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
        <img src={yazzLogo} alt="logo Yazz" className="app__footer-logo" />
        </a>
        <div className="app__footer-text">
          <a href="/terminosycondiciones">Términos y Condiciones</a>
          <a href="/preguntasfrecuentes">Preguntas Frecuentes</a>
          <a href="/nosotros">Sobre Nosotros</a>
          <a href="/admin">Log in Admin</a>
          <a href="/contacto">Contacto</a>
        </div>
        <div className="app__footer-socialcopyright">
          <div className="app__footer-socialcontainer">
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
              <img
                src={instagramLogo}
                alt="instagram link logo"
                className="app__footer-instagram"
              />
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
              <img src={facebookLogo} alt="facebook link logo" />
            </a>
          </div>
          <div className="app__footer-copyright">
            Yazz.com © 2002 - 2023 Reservados todos los derechos
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;