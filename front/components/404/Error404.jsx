import React from "react";
import { Link } from "react-router-dom";
import errorImg from '../../assets/Error_Search.jpg';
import './Error404.css';

export default function Error404() {
    return  (
        <div className="error_Section_container">
            <div className="error_Info_div">
                <h1 className="error_Title">404 Ruta inválida</h1>
                <Link className="error_Button_link" to='/'>Volvé a Shows</Link>
            </div>
            <img className="error_Img"  src={errorImg} alt='Page not found'/>
        </div>
      )

      
}