import React, { useEffect, useState } from "react";
import "./Shows.css";
import banner from "./Resources/banner.shows.fw.png";
import Pagination, { productIndex } from "../Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/actions";
import { Link } from "react-router-dom";
import { filterProducts } from "../../redux/actions";

// para ver si aplica cambios en main

const Shows = () => {
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const formattedDate = (StartDate) => {
    const date = new Date(StartDate + "T00:00:00");
    const options = { weekday: "long", day: "numeric", month: "numeric" };
    let formattedDate = date.toLocaleDateString("es-ES", options);
    formattedDate = formattedDate.replace("/", ".");
    formattedDate = formattedDate.replace(",", "");

    return formattedDate;
  };

  function countCategories(arr, name) {
    let count = 0;

    arr.forEach((e) => {
      e.Categories.forEach((category) => {
        if (category.name === name) {
          count++;
        }
      });
    });

    return count;
  }
  const categories = [];
  products.forEach((event) => {
    event.Categories.forEach((category) => {
      categories.push({
        id: category.id,
        name: category.name,
      });
    });
  });

  const uniqueCategories = [
    ...new Set(categories.map((category) => category.name)),
  ].map((name) => {
    return {
      id: categories.find((category) => category.name === name).id,
      name: name,
    };
  });

  const handleDayChange = (day) => {
    setSelectedDay(day);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  //

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(filterProducts(selectedDay, selectedCategoryId));
  }, [selectedDay, selectedCategoryId, dispatch]);

  const [currentPage, setCurrentPage] = useState(1);

  const handlePrev = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const { lastProduct, firstProduct } = productIndex(currentPage, 6);
  return (
    <div className="shows__background-container">
      <img src={banner} alt="banner shows" className="shows__banner-img" />

      {/* TRABAJAR FILTRADO POR FECHA*/}

      <div className="shows__filter-textcontainer">
        <div className="shows__filter-text">
          <h4>
            {selectedDay === "" ? (
              "PRÓXIMAS FUNCIONES"
            ) : (
              <button
                onClick={() => {
                  handleDayChange(selectedDay !== "" ? "" : selectedDay);
                }}
              >
                QUITAR FILTRO (X)
              </button>
            )}
          </h4>
        </div>
      </div>
      <div className="shows__filter-datescontainer">
        <div className={"shows__filter-box"}>
          <button
            style={selectedDay === 1 ? { color: `var(--color-yellow)` } : {}}
            onClick={() => {
              handleDayChange(1);
            }}
          >
            1 DÍA
          </button>
          <button
            style={selectedDay === 7 ? { color: `var(--color-yellow)` } : {}}
            onClick={() => {
              handleDayChange(7);
            }}
          >
            7 DÍAS
          </button>
          <button
            style={selectedDay === 30 ? { color: `var(--color-yellow)` } : {}}
            onClick={() => {
              handleDayChange(30);
            }}
          >
            15 DÍAS
          </button>
        </div>
      </div>

      {/*FIN FILTRADO  POR FECHAS*/}

      {products.length ? (
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
            products
              ?.sort(
                (a, b) =>
                  new Date(a.StartDate + "T00:00:00") -
                  new Date(b.StartDate + "T00:00:00")
              )
              .slice(firstProduct, lastProduct)
              .map((product) => {
                return (
                  <div className="shows__cards-box1">
                    <img
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
      ) : (
        <h1 className="shows__cards-h1FilterError">
          No se encontraron shows con el fitro seleccionado
        </h1>
      )}
      {/* TRABAJAR FILTRADO POR CATEGORIAS */}

      {products.length ? (
        <>
          <div className="shows__categories-title">
            <h4>
              {selectedCategoryId !== "" ? (
                <button
                  onClick={() => {
                    handleCategoryChange("");
                  }}
                >
                  QUITAR FILTRO (X)
                </button>
              ) : (
                "CATEGORÍAS"
              )}
            </h4>
          </div>
          <div className="shows__categories-box">
            {uniqueCategories.map((c) => {
              return (
                <button
                  onClick={() => {
                    handleCategoryChange(c.id);
                  }}
                  className="shows__categories-buttons"
                >
                  {c.name} ({countCategories(products, c.name)})
                </button>
              );
            })}
          </div>
        </>
      ) : (
        ""
      )}

      {/* FIN FILTRADO POR CATEGORIAS */}
      {products.length ? (
        <Pagination
          products={products}
          handlePrev={handlePrev}
          handleNext={handleNext}
          currentPage={currentPage}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Shows;
