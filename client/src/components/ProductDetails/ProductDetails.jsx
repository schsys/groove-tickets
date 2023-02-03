import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getProductById } from "../../redux/actions";
import "./ProductDetails.css";
// const data = {
//   id: 1,
//   name: "Symphony Serenade Return",
//   Description:
//     "Bienvenidos al concierto de música clásica del trío Symphony Serenade. Esta noche, tendremos la oportunidad de escuchar algunos de los compositores más famosos de todos los tiempos, como Beethoven, Mozart y Tchaikovsky",
//   StartDate: "2023-03-02",
//   EndDate: "2023-03-02",
//   Stock: 500,
//   Price: "1500.00",
//   StartTime: "12:00:00",
//   Status: "Active",
//   Photos: [
//     {
//       Id: 1,
//       Path: "https://res.cloudinary.com/dfuozesaq/image/upload/v1675357471/HenryMusic/clasica5_hb1l2j.jpg",
//     },
//   ],
//   Categories: [
//     {
//       Id: 1,
//       Name: "Clásica",
//       CategoryProduct: {
//         id: 1,
//         categoryId: 1,
//         productId: 1,
//         ProductId: 1,
//         CategoryId: 1,
//       },
//     },
//   ],
//   Artist: {
//     Id: 1,
//     Name: "Symphony Serenade",
//   },
//   Location: {
//     Id: 1,
//     Name: "Yazz concert club",
//     Address: "Av. san Martin 4567",
//     Coordinates: null,
//   },
// };

export default function ProductDetails() {
  const { id } = useParams();
  console.log("hola", id);
  const product = useSelector((state) => state.product);
  console.log("Product", product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);

  const date = new Date(product.StartDate);
  const options = { weekday: "long", day: "numeric", month: "numeric" };
  const formattedDate = date.toLocaleDateString("es-ES", options);
  return (
    <div className="container-details">
      <div className="global-container">
        <div className="product-container">
          <h2>{product.name};</h2>
          <span>
            <i className="fa fa-star">5</i>
          </span>
          <p>
            <i className="fas fa-calendar"></i> {formattedDate}
          </p>
          <p>
            <i className="fas fa-clock"></i> {product.StartTime} horas
            <p>
              <i className="fas fa-music"></i> Músicos: {product.Artist.Name}
            </p>
            {/*   <p>
              <i className="fas fa-tag"></i> {data.Categories}
            </p> */}
            <p>
              <i className="fas fa-map-marker-alt"></i> Ubicación:{" "}
              {product.Location.Address}
            </p>
          </p>
          <h2>Precio: ${product.Price}</h2>
        </div>
        <div className="image-container">
          <img
            src={product.Photos[0].Path}
            alt="product"
            className="product-image"
          />
        </div>
      </div>
      <button className="product-button">Comprar</button>
      <div className="product-info">
        <h4>Descripción:</h4>
        <p>{product.Description}</p>
      </div>
    </div>
  );
}
