import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  addCartProduct,
  getProductById,
  toggleShowCart,
} from "../../redux/actions";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import Footer from "../Footer/Footer";
import Loader from "../Loader/Loader";
import "./ProductDetails.css";

export default function ProductDetails() {
  const { id } = useParams();
  const product = useSelector((state) => state.product);
  const date = new Date(product.StartDate + "T00:00:00");
  const options = { weekday: "long", day: "numeric", month: "numeric" };
  const formattedDate = date.toLocaleDateString("es-ES", options);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductById(id));
    //La línea de código en formato comentado que estás debajo de este comentario deshabilita específicamente la regla "react-hooks/exhaustive-deps. No borrar por favor.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Carrito de compras y localStorage
  const [count, setCount] = React.useState(() => {
    const initialCount = localStorage.getItem("count") || 0;
    return parseInt(initialCount, 10);
  });
  const [availableStock, setAvailableStock] = React.useState(0);
  useEffect(() => {
    setAvailableStock(product.Stock);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    localStorage.setItem("count", count);
  }, [count]);
  function handleClick() {
    if (count < 10 && count < availableStock) {
      setCount(count + 1);
    } else if (count < 10 && count >= availableStock) {
      setCount(availableStock);
      alert("Solo tenemos disponibles " + availableStock);
    } else {
      alert("La cantidad máxima permitida es 10");
    }
  }

  // PARA AGREGAR AL CARRITO
  const itemsToCart = useSelector((state) => state.cart);
  const [mount, setMount] = useState(true);
  const showCart = useSelector((state) => state.showCart);

  useEffect(() => {
    if (!mount) {
      if (itemsToCart && itemsToCart.length) {
        window.localStorage.setItem("carrito", JSON.stringify(itemsToCart));
      } else {
        window.localStorage.removeItem("carrito");
        window.localStorage.removeItem("compra");
      }
    } else {
      setMount(false);
    }
  }, [dispatch, itemsToCart, mount]);

  const handleShowCart = () => {
    dispatch(toggleShowCart(!showCart));
    if (!showCart) {
      setTimeout(() => {
        dispatch(toggleShowCart(false));
      }, 2000);
    }
  };

  const addToCart = (id) => {
    dispatch(addCartProduct(id));
    handleShowCart();
  };

  //

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
  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);
 
  const itemQuantity = { product, count };
  
  return (
    <>
      {product.name ? (
        <div className="container_details">
          <div className="global_container">
            <div className="product_container">
              <h2>{product.name}</h2>
              <span>
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
              </span>

              <>
                <p>
                  <i className="fas fa-calendar"></i> {formattedDate}
                </p>
              </>

              <>
                <i className="fas fa-clock"></i> {product.StartTime.slice(0, 5)}{" "}
                horas
              </>

              <>
                {product.Artist && Object.keys(product.Artist).length > 0 ? (
                  <p>
                    <i className="fas fa-music"></i> Músico:{" "}
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
                  <Badge color="primary" badgeContent={count}>
                    <ShoppingCartIcon style={{ color: "white" }} />
                  </Badge>
                  <ButtonGroup>
                    <Button
                      style={{ background: "white" }}
                      onClick={() => {
                        setCount(Math.max(count - 1, 0));
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
          <button
            className="product_button"
            onClick={() => addToCart(itemQuantity)}
          >
            Agregar al Carrito
          </button>

          <div className="product_info">
            <h4>Descripción:</h4>
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
