import React from "react";
import { Link } from "react-router-dom";
import { addEditCartProduct, getTotalItems } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../utils/formatedDate";
import { formatTime } from "../utils/formatTime";
import { formatPrice } from "../utils/formatPrice";
import { FaInfoCircle, FaShoppingCart } from "react-icons/fa";

import Swal from "sweetalert2";
import Error_Search from "../../assets/Error_Search.jpg";

import { UserAuth } from "../../context/AuthContext";
import { useSelect } from "@mui/base";

import "../Shows/Shows.css";

const SingleCard = (data) => {
  const [count, setCount] = React.useState(0);
  const dispatch = useDispatch();
  const { user } = UserAuth();
  const orderId = useSelector((state) => state.orderId);

  const LimitAlert = () => {
    Swal.fire({
      imageUrl: Error_Search,
      imageHeight: 150,
      imageWidth: 200,
      imageAlt: "Alerta sobre nuestro stock.",
      title: "Yazz",
      html: "<h3>La cantidad máxima permitida es 10</h3>",
    });
  };

  const addToCartFromShows = async () => {
    if (count < 10) {
      await addEditCartProduct(data.data.id, 1, user, orderId).then(() => {
        setCount(count + 1);
        dispatch(getTotalItems(user));
      });
    } else {
      LimitAlert();
    }
  };

  /*(data.data.Stock > 0  || data.data.isShowFinished) ? ("shows__cards-box1") : ("shows__cards-Soldout")*/
const classStyle = () => {
  if(data.data.Stock > 0 && !data.data.isShowFinished) {
    return "shows__cards-box1"
  } else if(data.data.Stock < 1 || data.data.isShowFinished) {
    return "shows__cards-Soldout"
  }
}

  const displayStock = () => {
    if (data.data.isShowFinished) {
      return <p className="display_notAvaialbe">FINALIZADO</p>;
    } else if (data.data.Stock > 10) {
      return <p className="displayStock_Card">DISPONIBLE</p>;
    } else if (data.data.Stock <= 10 && data.data.Stock > 0) {
      return <p className="displayStock_Card_LAST">ÚLTIMAS ENTRADAS</p>;
    } else if (data.data.Stock < 1) {
      return <p className="displayStock_Card_OUT">AGOTADO</p>;
    }
  };

  return (
    <div
      className={
        (classStyle())
      }
      //  ref={cardRef}
      key={data.data.id}
    >
      {/* <h1 className="shows__cards-texth1">{data.data.name} - {data.data.isShowFinished ? 'FINALIZADO' : 'JAJA'}</h1> */}
      <Link className="shows__cards-link" to={`product/${data.data.id}`}>
        <div className="shows__cards_imgContainer">
          <img
            src={data.data.Photos[0].Path}
            alt="imagen show1"
            className="shows__cards-show1"
          />
          <div className="displayStock_container">{displayStock()}</div>
        </div>
      </Link>

      <div className="shows__cards-textContainer">
        <h1 className="shows__cards-texth1">{data.data.name}</h1>
        <h2 className="shows__cards-texth2">
          {formatDate(data.data.StartDate).replace(/^\w/, (c) =>
            c.toUpperCase()
          )}
        </h2>
        <h3 className="shows__cards-texth3">
          {formatTime(data.data.StartTime)} Horas
        </h3>
        <h3 className="shows__cards-textPrice">
          {formatPrice(data.data.Price)}
        </h3>
        <div className="shows_icons">
          {(data.data.Stock < 1 || data.data.isShowFinished) ? (
            " "
          ) : (
            <FaShoppingCart
              className="shows_cards-cart"
              onClick={addToCartFromShows}
            />
          )}
          <Link to={`product/${data.data.id}`} className="shows_cards-linkInfo">
            <FaInfoCircle />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleCard;
