import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import {
  addEditCartProduct,
  getProductById,
  toggleShowCart,
  getTotalItems,
  getProducts,
} from "../../redux/actions";

import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
// import Rating from "@mui/material/Rating";
// import StarIcon from "@mui/icons-material/Star";
import Swal from "sweetalert2";
import Error_Search from "../../assets/Error_Search.jpg";

import Loader from "../Loader/Loader";
import RecommendedShows from "../RecommendedShows/RecommendedShows";
import ShowReviews from "../ShowReviews/ShowReviews";

import "./ProductDetails.css";
import { UserAuth } from "../../context/AuthContext";

export default function ProductDetails() {
  const { id } = useParams();
  const products = useSelector((state) => state.products);
  const product = useSelector((state) => state.product);
  const date = new Date(product.StartDate + "T00:00:00");
  const options = { weekday: "long", day: "numeric", month: "numeric" };
  const formattedDate = date.toLocaleDateString("es-ES", options);
  const dispatch = useDispatch();
  const { user } = UserAuth();
 
  const [availableStock] = React.useState(0);

  const [url, setUrl] = useState('')

  //const itemsToCart = useSelector((state) => state.cart);
  //const [mount, setMount] = useState(true);

  const showCart = useSelector((state) => state.showCart);

  const [quantity, setQuantity] = React.useState(1);
  const orderId = useSelector((state) => state.orderId);

  useEffect(() => {
    dispatch(getProductById(id));
    //La línea de código en formato comentado que estás debajo de este comentario, deshabilita específicamente la regla "react-hooks/exhaustive-deps. No borrar por favor.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const backDirection = ()=> {
    return(
      product.isShowFinished ? '/oldshows' : '/'
    )
      
  }


  /* <Link to="/" className="back_button">
            <i className="fa-solid fa-chevron-left"></i> Atrás
            </Link>
          </div>*/

  const StockAvailableAlert = () => {
    Swal.fire({
      imageUrl: Error_Search,
      imageHeight: 150,
      imageWidth: 200,
      imageAlt: "Alerta sobre nuestro stock.",
      title: "Yazz",
      html: `<h3>Solo tenemos disponibles ${product.Stock} entradas</h3>`,
    });
  };

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

  function handleClick() {
    if (quantity < 10 && quantity < product.Stock) {
      setQuantity(quantity + 1);
    } else if (quantity < 10 && quantity >= product.Stock) {
      setQuantity(availableStock);
      StockAvailableAlert();
    } else {
      LimitAlert();
    }
  }

  // function handleClick() {
  //   if (quantity < 10 && quantity < product.Stock) {
  //     setQuantity(quantity + 1);
  //   } else if (quantity < 10 && quantity >= product.Stock) {
  //     setQuantity(availableStock);
  //     alert("Solo tenemos disponibles " + product.Stock);
  //   } else {
  //     alert("La cantidad máxima permitida es 10");
  //   }
  // }

  // PARA AGREGAR AL CARRITO
  // useEffect(() => {
  //   if (!mount) {
  //     if (itemsToCart && itemsToCart.length) {
  //       window.localStorage.setItem("carrito", JSON.stringify(itemsToCart));
  //     } else {
  //       window.localStorage.removeItem("carrito");
  //       window.localStorage.removeItem("compra");
  //     }
  //   } else {
  //     setMount(false);
  //   }
  // }, [dispatch, itemsToCart, mount]);

  const handleShowCart = () => {
    dispatch(toggleShowCart(!showCart));
    if (!showCart) {
      setTimeout(() => {
        dispatch(toggleShowCart(false));
      }, 2000);
    }
  };

  //cart
  const addToCart = async () => {
    if (quantity > 0) {
      await addEditCartProduct(product.id, quantity, user, orderId).then(() => {
        setQuantity(1);
        handleShowCart();
        dispatch(getTotalItems(user));
      });
    }
  };

  //Shows recomendados
  const category =
    product && product.Categories && product.Categories.length > 0
      ? product.Categories[0].Name
      : null;
  const recommendation =
    products &&
    products.filter(
      (p) => p.Categories[0].Name && p.Categories[0].Name === category
    );
  const topRecommended = recommendation.slice(0, 3);

  const message = () => {
    if (product.Stock < 1) {
      return <p className="show_soldout_text">SHOW AGOTADO</p>;
    } else if (product.Stock > 1 && product.isShowFinished) {
      return <p className="show_soldout_text">SHOW FINALIZADO</p>;
    }
  };

  const showIfNotExpired = () => {
    if (!product.isShowFinished) {
      return (
        <>
          <p>
            <i className="fas fa-clock"></i> {product.StartTime.slice(0, 5)}{" "}
            horas
          </p>
          <>
            {product.Artist && Object.keys(product.Artist).length > 0 ? (
              <p>
                <i className="fas fa-music"></i> Conjunto: {product.Artist.Name}
              </p>
            ) : (
              <p>Conjunto no disponible</p>
            )}
          </>

          <>
            {product.Categories && product.Categories.length > 0 ? (
              <p>
                {" "}
                <i className="fas fa-tag"></i> Género:{" "}
                {product.Categories[0].Name}
              </p>
            ) : (
              <p>No hay géneros disponibles</p>
            )}
          </>
          <>
            {product.Location && Object.keys(product.Location).length > 0 ? (
              <p>
                <i className="fas fa-map-marker-alt"></i> Ubicación:{" "}
                {product.Location.Name}
                {" -"} {product.Location.Address}
              </p>
            ) : (
              <p>No hay ubicación disponible</p>
            )}
          </>
          <>
            <h2 className="detail_price_h2">Precio: ${product.Price}</h2>
          </>
        </>
      );
    } else {
      return (
        <div className="average_opinion_div">
          <h3 className="average_opinion_title">Promedio de opiniones</h3>
        </div>
      );
    }
  };

  return (
    <>
      {product.name ? (
        <div className="container_details">
          <div className="back_button_div">
            <Link to={backDirection()} className="back_button">
            <i className="fa-solid fa-chevron-left"></i> Atrás
            </Link>
          </div>
          <div className="global_container">
            <div className="product_container">
              <h2>{product.name}</h2>
              <>
                <p>
                  <i className="fas fa-calendar"></i> {formattedDate}
                </p>
              </>
              {showIfNotExpired()}

              <Box
                sx={{
                  color: "action.active",
                  display: "flex",
                  flexDirection: "column",

                  "& .MuiBadge-root": {
                    marginRight: 4,
                  },
                }}
              >
                <div>
                  <div>
                    {product.Stock > 0 && !product.isShowFinished ? (
                      <>
                        <p className="detail_cart_explanation">
                          Elegí la cantidad y presioná "AGREGAR AL CARRITO"{" "}
                        </p>
                        <Badge color="warning" badgeContent={quantity}>
                          <ButtonGroup className="buttonGroup_toCart">
                            <Button
                              style={{ background: "white" }}
                              onClick={() => {
                                setQuantity(Math.max(quantity - 1, 1));
                              }}
                            >
                              <RemoveIcon
                                fontSize="small"
                                style={{ background: "white" }}
                              />
                            </Button>

                            <Button
                              style={{ background: "white" }}
                              onClick={handleClick}
                            >
                              <AddIcon fontSize="small" />
                            </Button>
                          </ButtonGroup>
                        </Badge>
                      </>
                    ) : (
                      " "
                    )}
                  </div>
                  <div className="product_button_div">
                    {product.Stock > 0 && !product.isShowFinished ? (
                      <button className="product_button" onClick={addToCart}>
                        Agregar al Carrito
                      </button>
                    ) : (
                      <div className="show_soldout_div">{message()}</div>
                    )}
                  </div>
                </div>
              </Box>
            </div>

            <div className="image_container">
              {product.Photos && product.Photos.length > 0 ? (
                <img
                  src={product.Photos[0].Path}
                  alt="product"
                  className={
                    product.Stock > 0 && !product.isShowFinished
                      ? "product_image"
                      : "photo_soldout_detail"
                  }
                />
              ) : (
                <p>No hay imágenes disponibles</p>
              )}
            </div>
          </div>

          <div className="product_info">
            <h4>Descripción:</h4>
            <p>{product.Description}</p>
          </div>

          {product.isShowFinished ? (
            <div className="detail_reviews_div">
              <ShowReviews productId={product.id} />
            </div>
          ) : (
            ""
          )}

          <RecommendedShows
            referencedShowId={product.id}
            categories={product.Categories.map((c) => c.Id)}
          />
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}
