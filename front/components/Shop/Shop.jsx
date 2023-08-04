import React from "react";
import CardShop from "./CardShop";
import "./Shop.css";

const Shop = () => {
  return (
    <div className="shop__container">
      <div className="shop-container__banner"></div>
      <span></span>
      <div className="shop-container__cards-container">
        <CardShop
        image="img"
        composer="composer"
        band="band"
        />
      </div>

    </div>
  );
};

export default Shop;
