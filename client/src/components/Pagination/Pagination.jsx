import React from "react";
import "./Pagination.css";

export const Pagination = ({ products, handlePrev, handleNext, currentPage }) => {
  const totalPages = Math.ceil(products.length / 6);
  
  return (
    <div className="shows__pagination-container">
      <div className="shows__pagination-textContainer">
        <button onClick={handlePrev} disabled={currentPage === 1}>
        <i className="fa-solid fa-chevron-left"></i> Anterior
        </button>
        <span>
          <span className="shows__pagination-currentPageUnderline">
            {currentPage}
          </span>{" "}
          de {totalPages}
        </span>
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Siguiente <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

export const productIndex = (page, productsXPage) => {
  const lastProduct = page * productsXPage;
  const firstProduct = lastProduct - productsXPage;
  return { lastProduct, firstProduct };
};
