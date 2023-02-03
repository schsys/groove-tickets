
import React, { useState } from "react";
import "./Shows.css";
import banner from "./Resources/banner.shows.fw.png";
import imageShow1 from "./Resources/Show.jpg";
import Pagination from "../Pagination/Pagination";
import { useSelector } from "react-redux";

const Shows = () => {
  const shows = useSelector((state) => state.shows);

  return (
    <div className="shows__background-container">
      <img src={banner} alt="banner shows" className="shows__banner-img" />

      {/* TRABAJAR FILTRADO POR FECHA*/}

      <div className="shows__filter-textcontainer">
        <div className="shows__filter-text">
          <h4>PRÓXIMAS FUNCIONES</h4>
        </div>
      </div>
      <div className="shows__filter-datescontainer">
        <div className="shows__filter-box">
          <div>24 HS</div>
          <div>7 DÍAS</div>
          <div>14 DÍAS</div>
        </div>
      </div>

      {/*FIN FILTRADO  POR FECHAS*/}

      <div className="shows__cards-container">
        <div className="shows__cards-box1">
          <img
            src={imageShow1}
            alt="imagen show1"
            className="shows__cards-show1"
          />
          <div className="shows__cards-textContainer">
            <h1 className="shows__cards-texth1">Los Carlitos</h1>
            <h2 className="shows__cards-texth2">Jueves 2.12</h2>
            <h3 className="shows__cards-texth3">20 hs</h3>
            <a href="shows/id" className="shows_cards-linkInfo">
              +
            </a>
          </div>
        </div>
        <div className="shows__cards-box1">
          <img
            src={imageShow1}
            alt="imagen show1"
            className="shows__cards-show1"
          />
          <div className="shows__cards-textContainer">
            <h1 className="shows__cards-texth1">Los Carlitos</h1>
            <h2 className="shows__cards-texth2">Jueves 2.12</h2>
            <h3 className="shows__cards-texth3">20 hs</h3>
            <a href="shows/id" className="shows_cards-linkInfo">
              +
            </a>
          </div>
        </div>
        <div className="shows__cards-box1">
          <img
            src={imageShow1}
            alt="imagen show1"
            className="shows__cards-show1"
          />
          <div className="shows__cards-textContainer">
            <h1 className="shows__cards-texth1">Los Carlitos</h1>
            <h2 className="shows__cards-texth2">Jueves 2.12</h2>
            <h3 className="shows__cards-texth3">20 hs</h3>
            <a href="shows/id" className="shows_cards-linkInfo">
              +
            </a>
          </div>
        </div>
        <div className="shows__cards-box1">
          <img
            src={imageShow1}
            alt="imagen show1"
            className="shows__cards-show1"
          />
          <div className="shows__cards-textContainer">
            <h1 className="shows__cards-texth1">Los Carlitos</h1>
            <h2 className="shows__cards-texth2">Jueves 2.12</h2>
            <h3 className="shows__cards-texth3">20 hs</h3>
            <a href="shows/id" className="shows_cards-linkInfo">
              +
            </a>
          </div>
        </div>
        <div className="shows__cards-box1">
          <img
            src={imageShow1}
            alt="imagen show1"
            className="shows__cards-show1"
          />
          <div className="shows__cards-textContainer">
            <h1 className="shows__cards-texth1">Los Carlitos</h1>
            <h2 className="shows__cards-texth2">Jueves 2.12</h2>
            <h3 className="shows__cards-texth3">20 hs</h3>
            <a href="shows/id" className="shows_cards-linkInfo">
              +
            </a>
          </div>
        </div>
        <div className="shows__cards-box1">
          <img
            src={imageShow1}
            alt="imagen show1"
            className="shows__cards-show1"
          />
          <div className="shows__cards-textContainer">
            <h1 className="shows__cards-texth1">Los Carlitos</h1>
            <h2 className="shows__cards-texth2">Jueves 2.12</h2>
            <h3 className="shows__cards-texth3">20 hs</h3>
            <a href="shows/id" className="shows_cards-linkInfo">
              +
            </a>
          </div>
        </div>
      </div>

      {/* TRABAJAR FILTRADO POR CATEGORIAS */}

      <div className="shows__categories-title">
        <h4>CATEGORÍAS</h4>
      </div>
      <div className="shows__categories-box">
        <p>Rock (2)</p>
        <p>Clásico (1)</p>
        <p>Jazz (3)</p>
        <p>Pop (5)</p>
        <p>Electrónica (2)</p>
      </div>

      {/* FIN FILTRADO POR CATEGORIAS */}
      <Pagination shows={shows}/>
    </div>
