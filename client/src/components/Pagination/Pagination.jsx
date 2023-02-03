import React, { useState } from "react";
import "./Pagination.css";

const Pagination = ({ shows }) => {
  
  // reeemplazar 12 por shows.length
  const totalPages = Math.ceil(12 / 6);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePrev = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

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
