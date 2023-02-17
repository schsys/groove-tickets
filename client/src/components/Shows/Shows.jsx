import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterProducts, getProducts } from "../../redux/actions";
import { Pagination, productIndex } from "../Pagination/Pagination";
import SingleCard from "../Cards/SingleCard";
import "./Shows.css";
// import banner from "../../assets/banner.shows.fw.png";
import Loader from "../Loader/Loader";

const Shows = () => {
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { lastProduct, firstProduct } = productIndex(currentPage, 6);
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [products]);

  const countCategories = (arr, name) => {
    let count = 0;
    arr.forEach((e) => {
      e.Categories.forEach((category) => {
        if (category.name === name) count++;
      });
    });
    return count;
  };

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
    dispatch(filterProducts(day, selectedCategoryId));
    setCurrentPage(1);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategoryId(categoryId);
    dispatch(filterProducts(selectedDay, categoryId));
    setCurrentPage(1);
  };

  const handlePrev = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const BtnTemplate = ({ value, action, data, style }) => {
    return (
      <button
        className={style}
        onClick={() => {
          action(data);
        }}
      >
        {value}
      </button>
    );
  };

  return (
    <div className="shows__background-container">
      {/* <img src={banner} alt="banner shows" className="shows__banner-img" /> */}
      {products.length ? (
      <>
      {/* FILTRADO POR FECHA*/}
      <div className="shows__filters-container">
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
            <BtnTemplate value="HOY" data={1} action={handleDayChange} />
            <BtnTemplate
              value="7 D&Iacute;AS"
              data={7}
              action={handleDayChange}
            />
            <BtnTemplate
              value="30 D&Iacute;AS"
              data={30}
              action={handleDayChange}
            />
          </div>
        </div>

        {/* FILTRADO POR CATEGORIAS */}
        <div className="shows__categories-container">
          {!products.length ? (
            ""
          ) : (
            <>
              <div className="shows__categories-title">
                <h4>
                  {selectedCategoryId !== "" ? (
                    <BtnTemplate
                      action={handleCategoryChange}
                      data=""
                      value="QUITAR FILTRO"
                    />
                  ) : (
                    "CATEGORÍAS"
                  )}
                </h4>
              </div>
              <div className="shows__categories-box">
                {uniqueCategories.map((c) => {
                  return (
                    <BtnTemplate
                      value={
                        c.name + " (" + countCategories(products, c.name) + ")"
                      }
                      action={handleCategoryChange}
                      data={c.id}
                      style="shows__categories-buttons"
                      key={c.id}
                    />
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
      {/* FIN FILTRADO POR CATEGORIAS */}

      <div className="shows__cards-container">
        {products.length ? (
          products
            ?.sort(
              (a, b) =>
                new Date(a.StartDate + "T00:00:00") -
                new Date(b.StartDate + "T00:00:00")
            )
            .slice(firstProduct, lastProduct)
            .map((prod) => <SingleCard data={prod} key={prod.id} />)
        ) : (
          <h1 className="shows__cards-h1FilterError">
            No se encontraron shows con el fitro seleccionado
          </h1>
        )}
      </div>
      
      {!products.length ? <></> : (
      <Pagination
        products={products}
        handlePrev={handlePrev}
        handleNext={handleNext}
        currentPage={currentPage}
        />
        )} 
      </>
      ) : (
        <>
        <Loader />
        </>
      ) 
    }   
    </div>
  );
};

export default Shows;
