import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOldShows } from "../../redux/actions";
import { Pagination, productIndex } from "../Pagination/Pagination";
import OldShowCard from "../OldShowCard/OldShowCard";
import "./OldShows.css";
// import banner from "../../assets/banner.shows.fw.png";
import Filters from "../Filters/FiltersV2";
import SkeletonShows from "../Skeleton/SkeletonShows";

const OldShows = () => {
  //const [selectedDay, setSelectedDay] = useState("");
  //const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { lastProduct, firstProduct } = productIndex(currentPage, 6);
  const products = useSelector((state) => state.products);
  const fetchProducts = useSelector((state) => state.fetchProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOldShows());
  }, [dispatch]);

  // NOTA de friss: el useEffect a continuación vuelve a la página 1 luego de hacer búsquedas;
  // Si por ejemplo el usuario está viendo la página 5 y se le ocurre buscar algo, si el resultado devuelve
  // menos de 5 páginas, currentPage va a apuntar a una página inexistente.
  // Esto es solo una solución temporal, quién pueda que lo haga de la manera correcta.
  useEffect(() => {
    setCurrentPage(1);
  }, [products]);

  const handlePrev = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  console.log("Shows currentPage: ", currentPage);

  return (
    <div className="oldshows__background-container">
      {/* <img src={banner} alt="banner shows" className="shows__banner-img" /> */}
      {fetchProducts === "loading" ? (
        <SkeletonShows />
      ) : (
        <>
         
          <div className="oldshows__cards-container">
            {!products.length ? (
              <h2 className="shows__cards-h1FilterError">
                No hay shows disponibles con los filtros seleccionados.
              </h2>
            ) : (
              products 
                ?.sort(
                  (a, b) =>
                    new Date(a.StartDate + "T00:00:00") -
                    new Date(b.StartDate + "T00:00:00")
                )
                .slice(firstProduct, lastProduct)
                .map((prod) => <OldShowCard data={prod} key={prod.id} />)
            )}
          </div>

          {products.length > 0 && (
            <Pagination
              products={products}
              handlePrev={handlePrev}
              handleNext={handleNext}
              currentPage={currentPage}
            />
          )}
        </>
      )}
    </div>
  );
};

export default OldShows;
