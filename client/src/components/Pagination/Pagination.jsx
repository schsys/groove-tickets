import React from "react";
import "./Pagination.css";

const Pagination = ({ products, handlePrev, handleNext, currentPage }) => {
  
  // reeemplazar 12 por products.length
  const totalPages = Math.ceil(products.length / 6);
  

  return (
    <div className="shows__pagination-container">
      <div className="shows__pagination-textContainer">
        <button onClick={handlePrev} disabled={currentPage === 1}>
          Anterior
        </button>
        <span>
          <span className="shows__pagination-currentPageUnderline">
            {currentPage}
          </span>{" "}
          de {totalPages}
        </span>
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Pagination;

export const productIndex = (page, productsXPage) => {
  const lastProduct = page * productsXPage;
  const firstProduct = lastProduct - productsXPage;
  return { lastProduct, firstProduct };
};
