import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { formatDate } from "../utils/formatedDate";
import { FaInfoCircle } from "react-icons/fa";
import { getReviews } from "../../common/integrations/api";

const OldShowCard = ({ show }) => {
  const history = useHistory();
  const [reviews, setReviews] = useState({
    data: {},
    fetchStatus: 'loading',
    error: null
  });

  useEffect(() => {
    async function fetchApiReviews(productId) {
      const response = await getReviews(productId);
      setReviews(response);
    }
    fetchApiReviews(show.id);
  }, [show.id])

  const AverageRating = () => {
    if (reviews.fetchStatus === 'succeeded' && reviews.data) {
      if (reviews.data.averageRating) {
        return <>
          <p className="card_average_number">
            {reviews.data.averageRating && reviews.data.averageRating.toFixed(2)}
          </p>
        </>
      }
    }
    return <p className="card_average_number">-</p>
  }

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }

  const handleGoToProduct = (productId) => {
    handleScrollToTop();
    history.push(`/product/${productId}`);
  }

  return (
    <div className="shows__cards-expired" key={show.id}>

      {/* <Link className="oldshows__cards-link" to={`product/${show.id}`}> */}
      <div className="oldshows__cards_imgContainer" onClick={() => handleGoToProduct(show.id)}>
        <img
          src={show.Photos[0].Path}
          alt="imagen show1"
          className="oldshows__cards-show1"
        />
      </div>
      {/* </Link> */}

      <div className="oldshows__cards-textContainer_expired">
        <h1 className="oldshows__cards-texth1">{show.name}</h1>
        <h2 className="oldshows__cards-texth2">
          {formatDate(show.StartDate, 'short')}
        </h2>
        <div className="oldcard_average_opinion_div">
          <h3 className="oldcard_average_opinion_title">Promedio de opiniones</h3>
          <AverageRating />
        </div>
        <div className="oldshows_icons">

          <div className="oldshows_cards-linkInfo">
            <FaInfoCircle onClick={() => handleGoToProduct(show.id)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OldShowCard;
