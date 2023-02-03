import React from "react";
import "./ProductDetails.css";
import Footer from "../Footer/Footer";

const data = {
  id: 1,
  name: "Symphony Serenade Return",
  Description:
    "Bienvenidos al concierto de música clásica del trío Symphony Serenade. Esta noche, tendremos la oportunidad de escuchar algunos de los compositores más famosos de todos los tiempos, como Beethoven, Mozart y Tchaikovsky",
  StartDate: "2023-03-02",
  EndDate: "2023-03-02",
  Stock: 500,
  Price: "1500.00",
  StartTime: "12:00:00",
  Status: "Active",
  Photos: [
    {
      Id: 1,
      Path: "https://res.cloudinary.com/dfuozesaq/image/upload/v1675357471/HenryMusic/clasica5_hb1l2j.jpg",
    },
  ],
  Categories: [
    {
      Id: 1,
      Name: "Clásica",
      CategoryProduct: {
        id: 1,
        categoryId: 1,
        productId: 1,
        ProductId: 1,
        CategoryId: 1,
      },
    },
  ],
  Artist: {
    Id: 1,
    Name: "Symphony Serenade",
  },
  Location: {
    Id: 1,
    Name: "Yazz concert club",
    Address: "Av. san Martin 4567",
    Coordinates: null,
  },
};

const date = new Date(data.StartDate);
const options = { weekday: "long", day: "numeric", month: "numeric" };
const formattedDate = date.toLocaleDateString("es-ES", options);

export default function ProductDetails() {
  return (
    <div className="container-details">
      <div className="global-container">
        <div className="product-container">
          <h2>{data.name};</h2>
          <span>
            <i className="fa fa-star">5</i>
          </span>
          <p>
            <i className="fas fa-calendar"></i> {formattedDate}
          </p>
          <p>
            <i className="fas fa-clock"></i> {data.StartTime} horas
            <p>
              <i className="fas fa-music"></i> Músicos: {data.Artist.Name}
            </p>
            {/*   <p>
              <i className="fas fa-tag"></i> {data.Categories}
            </p> */}
            <p>
              <i className="fas fa-map-marker-alt"></i> Ubicación:{" "}
              {data.Location.Address}
            </p>
          </p>
          <h2>Precio: ${data.Price}</h2>
        </div>
        <div className="image-container">
          <img
            src={data.Photos[0].Path}
            alt="product"
            className="product-image"
          />
        </div>
      </div>
      <button className="product-button">Comprar</button>
      <div className="product-info">
        <h4>Descripción:</h4>
        <p>{data.Description}</p>
      </div>
      <Footer />
    </div>
  );
}
