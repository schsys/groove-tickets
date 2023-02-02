import React from "react";
import "./ProductDetails.css";
import img from "./img.jpg";

const props = {
  name: "Symphony Serenade",
  rating: 5,
  date: "Jueves 12/2",
  time: 15,
  musicians: "Sofia Perez, Carlos Ortiz, Isabel Martinez",
  category: "Clásica",
  location: "La Rioja 2026, Mar del Plata",
  price: 3000,
  img: img,
  description:
    "Bienvenidos al concierto de música clásica del trío Symphony Serenade. Esta noche, tendremos la oportunidad de escuchar algunos de los compositores más famosos de todos los tiempos, como Beethoven, Mozart y Tchaikovsky. ¡Prepárense para una noche de música impresionante!",
  comments: ["Bueno", "Excelente", "Bueno", "Malo"],
};
export default function ProductDetails() {
  return (
    <div className="container-details">
      <div className="global-container">
        <div className="product-container">
          <h2>{props.name}</h2>
          <span>
            {Array.from({ length: props.rating }, (_, i) => (
              <i key={i} class="fa fa-star"></i>
            ))}
          </span>
          <p>
            <i class="fas fa-calendar"></i> {props.date}
          </p>
          <p>
            <i class="fas fa-clock"></i> {props.time} horas
            <p>
              <i class="fas fa-music"></i> Músicos: {props.musicians}
            </p>
            <p>
              <i class="fas fa-tag"></i> {props.category}
            </p>
            <p>
              <i class="fas fa-map-marker-alt"></i> Ubicación: {props.location}
            </p>
          </p>
          <h2>Precio: ${props.price}</h2>
        </div>
        <div className="image-container">
          <img src={props.img} alt="product" className="product-image" />
        </div>
      </div>
      <button className="product-button">Comprar</button>
      <div className="product-info">
        <h4>Descripción:</h4>
        <p>{props.description}</p>
        <h4>Comentarios de Clientes:</h4>
        {props.comments.map((comment, index) => (
          <p key={index}>
            <i className="fa-solid fa-user"></i> {comment}
          </p>
        ))}
      </div>
    </div>
  );
}
