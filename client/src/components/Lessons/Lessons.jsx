import React from "react";
import "./Lessosns.css";
import logoyazz from "./logo yazz transparente.fw.png";
import WhatsAppIcon from "./whatsappSVG.svg";
import imgCard from "./img_muestra.jpg";

export default function Lessons() {
  return (
    <div>
      <div className="container">
        <div className="logoyazz">
          <img src={logoyazz} alt="Logo-yazz" />
        </div>
        <div>
          <form className="form-container">
            <p>
              <b>Lorem ipsum dolor sit amet.</b>
            </p>
            <p>
              <b>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</b>
            </p>
            <p id="p1">
              <span className="name">
                <input placeholder="Nombre"></input>
                <input placeholder="Télefono"></input>
                <input placeholder="Email"></input>
                <input placeholder="País"></input>
              </span>
            </p>

            <p className="footer-form">
              formulariosyazz.edu.co
              <br />
              +57 1 5151515 ext. 106
              <br />
              Política de privacidad de datos
            </p>
            <button type="submit">Enviar información</button>
          </form>
          <div class="card-container">
            <div class="card">
              <div class="card-body">
                <img src={imgCard} alt="img-card" />
                <img src={imgCard} alt="img-card" />
                <img src={imgCard} alt="img-card" />
              </div>

              <div class="card-body2">
                <img src={imgCard} alt="img-card" />
                <img src={imgCard} alt="img-card" />
                <img src={imgCard} alt="img-card" />
              </div>
            </div>
          </div>

          <a
            href="https://api.whatsapp.com"
            className="whatsapp"
            target="_blank"
            rel="noreferrer"
          >
            <img src={WhatsAppIcon} alt="whatsapp-icon" />
          </a>
        </div>
      </div>
    </div>
  );
}
