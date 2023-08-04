import React from "react";
import "./CardShop.css";
import img from "./e2d28261-027c-45a5-a611-62449bb95a23.jpg";

export default function CardShop(props) {
  const { image, composer, band } = props;
  return (
    <div className="card-shop__container">
      <img src={image} alt={image} />
      {/* Feb 26, 2023 */}
      <span>{composer}</span>
      <p>{band}</p>
      <img src={img} alt={img} />
      {/* Feb 26, 2023 */}
      <span>Fulanito Perez</span>
      <p>Chinguenguenchas</p>
    </div>
  );
}
