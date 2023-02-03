import React, { useEffect, useState } from "react";
import "./Shows.css";
import banner from "./Resources/banner.shows.fw.png";
import Pagination, { productIndex } from "../Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/actions";
import { Link } from "react-router-dom";
import {filterProductsByDate} from "../../redux/actions"

const Shows = () => {
  const [input, setInput] = useState("");
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  // PARA FILTRADO POR FECHA
  const handleOrderByName = (day) => {
    dispatch(filterProductsByDate(day));
    setInput(day);
    setCurrentPage(1);
  };
  //

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const [currentPage, setCurrentPage] = useState(1);

  const handlePrev = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const { lastProduct, firstProduct } = productIndex(currentPage, 6);

  const formattedDate = (StartDate) => {
    const date = new Date(StartDate);
    const options = { weekday: "long", day: "numeric", month: "numeric" };
    let formattedDate = date.toLocaleDateString("es-ES", options);
    formattedDate = formattedDate.replace("/", ".");
    formattedDate = formattedDate.replace(",", "");

    return formattedDate;
  };

  return (
    <div className="shows__background-container">
      <img src={banner} alt="banner shows" className="shows__banner-img" />

      {/* TRABAJAR FILTRADO POR FECHA*/}

      <div className="shows__filter-textcontainer">
        <div className="shows__filter-text">
          <h4>PRÓXIMAS FUNCIONES</h4>
        </div>
      </div>
      <div className="shows__filter-datescontainer">
        <div className="shows__filter-box">
          <button 
          onClick={() => {
            handleOrderByName(1)
          }}
          >1 DÍA</button>
          <button onClick={() => {
            handleOrderByName(7)
          }}>7 DÍAS</button>
          <button onClick={() => {
            handleOrderByName(15)
          }}>15 DÍAS</button>
        </div>
      </div>

      {/*FIN FILTRADO  POR FECHAS*/}

      <div className="shows__cards-container">
        {Array.isArray(products) === false ? (
          <div className="shows__cards-box1">
            <img
              src={products.Photos[0].Path}
              alt="imagen show1"
              className="shows__cards-show1"
            />
            <div className="shows__cards-textContainer">
              <h1 className="shows__cards-texth1">{products.name}</h1>
              <h2 className="shows__cards-texth2">
                {formattedDate(products.StartDate).replace(/^\w/, (c) =>
                  c.toUpperCase()
                )}
              </h2>
              <h3 className="shows__cards-texth3">
                {products.StartTime.slice(0, 2)}
              </h3>
              <Link
                to={`product/${products.id}`}
                className="shows_cards-linkInfo"
              >
                +
              </Link>
            </div>
          </div>
        ) : (
          products?.slice(firstProduct, lastProduct).map((product) => {
            return (
              <div className="shows__cards-box1">
                <img
                  // src={imagen}
                  src={product.Photos[0].Path}
                  alt="imagen show1"
                  className="shows__cards-show1"
                />
                <div className="shows__cards-textContainer">
                  <h1 className="shows__cards-texth1">{product.name}</h1>
                  <h2 className="shows__cards-texth2">
                    {formattedDate(product.StartDate).replace(/^\w/, (c) =>
                      c.toUpperCase()
                    )}
                  </h2>
                  <h3 className="shows__cards-texth3">
                    {product.StartTime.slice(0, 2)} Horas
                  </h3>
                  <Link
                    to={`product/${product.id}`}
                    className="shows_cards-linkInfo"
                  >
                    +
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* TRABAJAR FILTRADO POR CATEGORIAS */}

      <div className="shows__categories-title">
        <h4>CATEGORÍAS</h4>
      </div>
      <div className="shows__categories-box">
        <p>Rock (2)</p>
        <p>Clásico (1)</p>
        <p>Jazz (3)</p>
        <p>Pop (5)</p>
        <p>Electrónica (2)</p>
      </div>

      {/* FIN FILTRADO POR CATEGORIAS */}
      <Pagination
        products={products}
        handlePrev={handlePrev}
        handleNext={handleNext}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Shows;
