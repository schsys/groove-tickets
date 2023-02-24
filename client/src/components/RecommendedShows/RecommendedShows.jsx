import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { formatDate } from "../utils/formatedDate";
import { formatPrice } from "../utils/formatPrice";
import "./RecommendedShows.css";


export default function RecommendedShows({
  referencedShowId,
  categories,
  handleClickRecom,
}) {
  const products = useSelector((state) => state.products);
  const [productByCat, setProductByCat] = useState([]);
  // const { id } = useParams();
  // const history = useHistory();


  useEffect(() => {
    const date = new Date().toLocaleDateString("es-ES");
    console.log("date", date);


    const filteredProducts = products
      .filter((p) => {
        if (p.id === referencedShowId) return false;


        return (
          p.Categories.filter((c) => {
            const isCategoryIncluded = categories.includes(c.id);


            return isCategoryIncluded;
          }).length > 0
        );
      })
      .filter((d) => new Date(d.StartDate).toLocaleDateString("es-ES") >= date);


    setProductByCat(filteredProducts.slice(0, 3));
  }, [referencedShowId, categories, products]);


  return (
    <div className="recommended_section">
      {productByCat.map((p) => {
        return (
         
          <div className="recommended_section_container" onClick={() => handleClickRecom(p.id)}
          >
            <Link className="recommended_link" to={`/product/${p.id}`}>
              <div className="recommended_section_photo">
                <img src={p.Photos[0].Path} alt="portada show recomendado" />
              </div>
              <div className="recommended_section_info">
                <h2 className="recommended_section_h2">{p.name}</h2>
                <p className="recommended_section_text">
                  {formatDate(p.StartDate).replace(/^\w/, (c) =>
                    c.toUpperCase()
                  )}
                </p>
                <p className="recommended_section_text">{p.Artist.Name}</p>
                <h3 className="recommended_section_price">
                  {formatPrice(p.Price)}
                </h3>
              </div>
            </Link>
          </div>
        );
      })}
     
       
    </div>
  );
}


