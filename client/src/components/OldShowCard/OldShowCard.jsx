import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../utils/formatedDate";
import { FaInfoCircle } from "react-icons/fa";

import { UserAuth } from "../../context/AuthContext";

import "../Shows/Shows.css";

const OldShowCard = (data) => {
 
  const dispatch = useDispatch();
  const { user } = UserAuth();

  return (
    <div className="shows__cards-expired" key={data.data.id}>

      <Link className="shows__cards-link" to={`product/${data.data.id}`}>
        <div className="shows__cards_imgContainer">
          <img
            src={data.data.Photos[0].Path}
            alt="imagen show1"
            className="shows__cards-show1"
          /> 
          {/*Muestra cartel avisando si hay o no stock*/}
          <div className="display_notAvaialbe">FINALIZADO</div>
        </div>
      </Link>

      <div className={!data.data.isShowFinished ? ("shows__cards-textContainer")
       : ("shows__cards-textContainer_expired")}>
        <h1 className="shows__cards-texth1">{data.data.name}</h1>
        <h2 className="shows__cards-texth2">
          {formatDate(data.data.StartDate).replace(/^\w/, (c) =>
            c.toUpperCase()
          )}
        </h2>
        <div className="card_average_opinion_div">
          <h3 className="card_average_opinion_title">Promedio de opiniones</h3>
        </div>
        <div className="shows_icons">
         
          <Link to={`product/${data.data.id}`} className="shows_cards-linkInfo">
            <FaInfoCircle />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OldShowCard;
