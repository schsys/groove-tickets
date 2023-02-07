import React from "react";
import { useEffect } from "react";
import "./ProductDetails.css";
import Footer from "../Footer/Footer";
import { useSelector, useDispatch } from "react-redux";
import { getProductById } from "../../redux/actions";
import { useParams } from "react-router-dom";

import Loader from "../Loader/Loader";

export default function ProductDetails() {
  const { id } = useParams();
  const product = useSelector((state) => state.product);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductById(id));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const date = new Date(product.StartDate);
  const options = { weekday: "long", day: "numeric", month: "numeric" };
  const formattedDate = date.toLocaleDateString("es-ES", options);
  return (
    <>
      {product.name ? (
        <div className="container_details">
          <div className="global_container">
            <div className="product_container">
              <h2>{product.name};</h2>
              <span>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
              </span>

              <>
                <p>
                  <i className="fas fa-calendar"></i> {formattedDate}
                </p>
              </>

              <>
                <i className="fas fa-clock"></i> {product.StartTime} horas
              </>

              <>
                {product.Artist && Object.keys(product.Artist).length > 0 ? (
                  <p>
                    <i className="fas fa-music"></i> Músico:{" "}
                    {product.Artist.Name}
                  </p>
                ) : (
                  <p>Músico no disponible</p>
                )}
              </>

              <>
                {product.Categories && product.Categories.length > 0 ? (
                  <p>
                    {" "}
                    <i className="fas fa-tag"></i> {product.Categories[0].Name}
                  </p>
                ) : (
                  <p>No hay categorías disponibles</p>
                )}
              </>
              <>
                {product.Location &&
                Object.keys(product.Location).length > 0 ? (
                  <p>
                    <i className="fas fa-map-marker-alt"></i> Ubicación:{" "}
                    {product.Location.Name}
                    {" -"} {product.Location.Address}
                  </p>
                ) : (
                  <p>No hay ubicación disponible</p>
                )}
              </>
              <>
                <h2>Precio: ${product.Price}</h2>
              </>
            </div>

            <div className="image_container">
              {product.Photos && product.Photos.length > 0 ? (
                <img
                  src={product.Photos[0].Path}
                  alt="product"
                  className="product_image"
                />
              ) : (
                <p>No hay imágenes disponibles</p>
              )}
            </div>
          </div>
          <button className="product_button">Comprar</button>
          <div className="product_info">
            <h4>Descripción:</h4>
            <p>{product.Description}</p>
          </div>
          <Footer />
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}
