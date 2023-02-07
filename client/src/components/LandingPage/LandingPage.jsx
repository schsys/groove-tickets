import React from "react";
import { Link } from "react-router-dom";
import './LandingPage.css';

// import teaching from './TeachingPiano.jpg';
import shows from './Shows.jpg';
// import discs from './Discs.jpg';

export default function LandingPage() {
  return (
    <div className="landindPage_section">
      <div className="landingPage_titles">
        <h1 className="landingPage_titles_h1">BIENVENIDOS A YAZZ</h1>
      </div>
      <div className="landingPage_cards">
        <Link className="landingPage_link" to={'/shows'}>
            <div className="landingPage_cards_shows">
                <img src={shows} alt="entra a ver nuestros shows" />
                <h3>Shows</h3>
            </div>        
        </Link>
        {/* <Link className="landingPage_link" to={'/lessons'}>
            <div className="landingPage_cards_shows">
                <img src={teaching} alt="clases de instrumentos" />
                <h3>Clases</h3>
            </div>
        </Link>
        <Link className="landingPage_link" to={'/shop'}>
            <div className="landingPage_cards_shows">
                <img src={discs} alt="mira nuestros productos" />
                <h3>Tienda</h3>
            </div>  
        </Link> */}
      </div>
    </div>
  );
}
