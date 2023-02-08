import React from 'react'
import { useSelector } from 'react-redux';
import { productIndex } from "../Pagination/Pagination";

const SingleCard = () => {

  const products = useSelector((state) => state.products);
  const { lastProduct, firstProduct } = productIndex(currentPage, 6);

      {products.length ? (
        <div >
          {Array.isArray(products) === false ? (
            <div >
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
                  <div className="shows__cards-box1" key={product.id}>
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


  return (
    <>

    </>
  )
}

export default SingleCard