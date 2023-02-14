import React from "react";
import { Link } from "react-router-dom";
import { formattedDate } from "../utils/formatedDate";
import { FaInfoCircle } from "react-icons/fa";
import "../Shows/Shows.css";

const SingleCard = (data) => {
  // console.log("-- inicio de datos --");
  // console.log('la data completa: ', data)
  // console.log('id: ', data.data.id)
  // console.log('imagen: ', data.data.Photos[0].Path)
  // console.log('nombre: ', data.data.name)
  // console.log('fecha: ', data.data.StartDate)
  // console.log('hora: ', data.data.StartTime)
  // console.log("-- fin de datos --");

  return (
    <div className="shows__cards-box1" key={data.data.id}>
      <Link className="shows__cards-link" to={`product/${data.data.id}`}>
        <img
          src={data.data.Photos[0].Path}
          alt="imagen show1"
          className="shows__cards-show1"
        />
        <div className="shows__cards-textContainer">
          <h1 className="shows__cards-texth1">{data.data.name}</h1>
          <h2 className="shows__cards-texth2">
            {formattedDate(data.data.StartDate).replace(/^\w/, (c) =>
              c.toUpperCase()
            )}
          </h2>
          <h3 className="shows__cards-texth3">
            {data.data.StartTime.slice(0, 2)} Horas
          </h3>
          <Link to={`product/${data.data.id}`} className="shows_cards-linkInfo">
            <FaInfoCircle />
          </Link>
        </div>
      </Link>
    </div>
  );
};

export default SingleCard;
