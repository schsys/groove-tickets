import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/actions";
import { Pagination, productIndex } from "../Pagination/Pagination";
import SingleCard from "../Cards/SingleCard";
import "./Shows.css";
// import banner from "../../assets/banner.shows.fw.png";
//import Loader from "../Loader/Loader";
import Filters from "../Filters/Filters";
import SkeletonShows from "../Skeleton/SkeletonShows";

const Shows = () => {
  //const [selectedDay, setSelectedDay] = useState("");
  //const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { lastProduct, firstProduct } = productIndex(currentPage, 6);
  const [loading, setLoading] = useState(false);
  const products = useSelector((state) => state.products);
  const filtered = useSelector((state) => state.filteredProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handlePrev = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  console.log("Shows currentPage: ", currentPage);

  return (
    <div className="shows__background-container">
      {/* <img src={banner} alt="banner shows" className="shows__banner-img" /> */}
      {!products.length ? (
        <SkeletonShows />
      ) : (
        <>
          {/* FILTRADO*/}
          <div className="shows__filters-container">
            <Filters />
          </div>
          {/* FIN FILTRADO*/}

          <div className="shows__cards-container">
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
                .map((prod) => <SingleCard data={prod} key={prod.id} />)
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

export default Shows;
