detalles-de-un-producto-individual
import React from "react";
import { useEffect } from "react";
import "./ProductDetails.css";
import Footer from "../Footer/Footer";
import { useSelector, useDispatch } from "react-redux";
import { getProductById } from "../../redux/actions";
import { useParams } from "react-router-dom";

export default function ProductDetails() {
  const { id } = useParams();
  const product = useSelector((state) => state.product);


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductById(id));
 detalles-de-un-producto-individual

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const date = new Date(product.StartDate);
  const options = { weekday: "long", day: "numeric", month: "numeric" };
  const formattedDate = date.toLocaleDateString("es-ES", options);


  return (
    <div className="container-details">
      <div className="global-container">
        <div className="product-container">
          <h2>{product.name};</h2>
          <span>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
          </span>
          <p>
            <i className="fas fa-calendar"></i> {formattedDate}
          </p>
          <p>
            <i className="fas fa-clock"></i> {product.StartTime} horas
               detalles-de-un-producto-individual
            {/*  <p>
              <i className="fas fa-music"></i> Músicos: {product.Artist.Name}
            </p> */}
            {/*   <p>
              <i className="fas fa-tag"></i> {product.Categories.name}
            </p>
            <p>
              <i className="fas fa-map-marker-alt"></i> Ubicación:{" "}
              {product.Location.Address}
              detalles-de-un-producto-individual
            </p> */}

          </p>
          <h2>Precio: ${product.Price}</h2>
        </div>
        {/*  <div className="image-container">
          <img
            src={product.Photos[0].Path}
            alt="product"
            className="product-image"
          />
        </div> */}
      </div>
      <button className="product-button">Comprar</button>
      <div className="product-info">
        <h4>Descripción:</h4>
        <p>{product.Description}</p>
      </div>
    </div>
  );
}
