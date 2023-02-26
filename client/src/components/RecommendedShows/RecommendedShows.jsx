import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { formatDate } from "../utils/formatedDate";
import { formatPrice } from "../utils/formatPrice";
import { getRecommendedProducts } from "../../common/integrations/api";
import "./RecommendedShows.css";

export default function RecommendedShows({ referencedShowId, categories }) {
  const history = useHistory();

  const [products, setProducts] = useState({
    items: [],
    fetchStatus: 'loading',
    error: null
  });

  useEffect(() => {
    async function fetchProducts(referencedShowId, categories) {
      const response = await getRecommendedProducts(referencedShowId, categories);
      // console.log('response: ', response);


      setProducts(response);
    }

    fetchProducts(referencedShowId, categories)
  }, [referencedShowId, categories]);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }

  const handleGoToProduct = (productId) => {
    handleScrollToTop();
    history.push(`/product/${productId}`);
  }

  if (products.fetchStatus === 'loading') {
    return <div className="detail_recommended_shows">
      <h3>Buscando shows relacionados...</h3>
    </div>;
  }
  if (products.fetchStatus === 'failed' || products.items.length === 0) {
    return <></>;
  }

  return (
    <div className="detail_recommended_shows">
      <h3 className="detail_recommended_shows_h3">Si te gusta esta música, seguro te van a gustar estos shows</h3>
      <div className="recommended_inDetail">
        <div className="recommended_section">
          {products.items.slice(0, 3).map((p) => {
            return (
              <div key={p.id} className="recommended_section_container" onClick={() => handleGoToProduct(p.id)}>
                {/* <Link className="recommended_link" to={`/product/${p.id}`}> */}
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
                {/* </Link> */}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}


