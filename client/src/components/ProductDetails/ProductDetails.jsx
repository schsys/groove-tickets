import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import {
  addEditCartProduct,
  getProductById,
  toggleShowCart,
} from "../../redux/actions";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import Typography from "@mui/material/Typography";
import Footer from "../Footer/Footer";
import Loader from "../Loader/Loader";
import "./ProductDetails.css";
import { UserAuth } from "../../context/AuthContext";

export default function ProductDetails() {
  const { id } = useParams();
  const product = useSelector((state) => state.product);
  const date = new Date(product.StartDate + "T00:00:00");
  const options = { weekday: "long", day: "numeric", month: "numeric" };
  const formattedDate = date.toLocaleDateString("es-ES", options);
  const dispatch = useDispatch();
  const { user } = UserAuth();

  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);

  const [availableStock] = React.useState(0);

  //const itemsToCart = useSelector((state) => state.cart);
  //const [mount, setMount] = useState(true);

  const showCart = useSelector((state) => state.showCart);

  const [quantity, setQuantity] = React.useState(1);

  useEffect(() => {
    dispatch(getProductById(id));
    //    setAvailableStock(product.Stock);
    //La línea de código en formato comentado que estás debajo de este comentario deshabilita específicamente la regla "react-hooks/exhaustive-deps. No borrar por favor.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleClick() {
    if (quantity < 10 && quantity < product.Stock) {
      setQuantity(quantity + 1);
    } else if (quantity < 10 && quantity >= product.Stock) {
      setQuantity(availableStock);
      alert("Solo tenemos disponibles " + product.Stock);
    } else {
      alert("La cantidad máxima permitida es 10");
    }
  }

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
  const addToCart = () => {
    if (quantity > 0) {
      dispatch(addEditCartProduct(product.id, quantity, user));
      setQuantity(1);
      handleShowCart();
    }
  };

  //Rating
  const labels = {
    0.5: "Inútil",
    1: "Inútil+",
    1.5: "Pobre",
    2: "Pobre+",
    2.5: "Ok",
    3: "Ok+",
    3.5: "Bueno",
    4: "Bueno+",
    4.5: "Excelente",
    5: "Excelente+",
  };

  function getLabelText(value) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
  }

  return (
    <>
      {product.name ? (
        <div className="container_details">
          <div className="back_button_div">
            <Link to="/" className="back_button">
              Atrás
            </Link>
          </div>
          <div className="global_container">
            <div className="product_container">
              <h2>{product.name}</h2>
              <div className="detail_rating_containter">
                <Box
                  sx={{
                    width: 200,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Rating
                    name="hover-feedback"
                    value={value}
                    precision={0.5}
                    getLabelText={getLabelText}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                    onChangeActive={(event, newHover) => {
                      setHover(newHover);
                    }}
                    emptyIcon={
                      <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                    }
                  />
                  {value !== null && (
                    <Box sx={{ ml: 2 }}>
                      {labels[hover !== -1 ? hover : value]}
                    </Box>
                  )}
                </Box>
              </div>
              <>
                <p>
                  <i className="fas fa-calendar"></i> {formattedDate}
                </p>
              </>
              <p>
                <i className="fas fa-clock"></i> {product.StartTime.slice(0, 5)}{" "}
                horas
              </p>
              <>
                {product.Artist && Object.keys(product.Artist).length > 0 ? (
                  <p>
                    <i className="fas fa-music"></i> Artistas:{" "}
                    {product.Artist.Name}
                  </p>
                ) : (
                  <p>Músico no disponible</p>
                )}
              </>

              <>
                {product.Categories && product.Categories.length > 0 ? (
                  <p>
                    {" "}
                    <i className="fas fa-tag"></i> Categoría:{" "}
                    {product.Categories[0].Name}
                  </p>
                ) : (
                  <p>No hay categorías disponibles</p>
                )}
              </>
              <>
                {product.Location &&
                Object.keys(product.Location).length > 0 ? (
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
                <h2>Precio: ${product.Price}</h2>
              </>

              <Box
                sx={{
                  color: "action.active",
                  display: "flex",
                  flexDirection: "column",
                  "& > *": {
                    marginBottom: 2,
                  },
                  "& .MuiBadge-root": {
                    marginRight: 4,
                  },
                }}
              >
                <div>
                  <Typography color="white" variant="body2" xs={{ pl: 0 }}>
                    SELCCIONA LA CANTIDAD Y PRESIONA AGREGAR AL CARRITO{" "}
                    <Badge color="warning" badgeContent={quantity}>
                      <ButtonGroup>
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
                  </Typography>
                  <div className="product_button_div">
                    <button className="product_button" onClick={addToCart}>
                      Agregar al Carrito
                    </button>
                  </div>
                </div>
              </Box>
            </div>

            <div className="image_container">
              {product.Photos && product.Photos.length > 0 ? (
                <img
                  src={product.Photos[0].Path}
                  alt="product"
                  className="product_image"
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

          <div className="detail_reviews_div">
            <h4>Esto opinan los que conocen la banda:</h4>
            <p>{product.Description}</p>
          </div>
          <Footer />
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}
