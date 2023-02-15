import React, { useState } from "react";
import {
  Avatar,
  Button,
  Divider,
  Drawer,
  Paper,
  Typography,
  // IconButton,
} from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import "./Cart.css";
import {
  toggleShowCart,
  removeCartProduct,
  editCartProduct,
  emptyCart,
} from "../../redux/actions";
import DeleteOutlined from "@mui/icons-material/DeleteOutlined";
import { useHistory } from "react-router-dom";

const Cart = () => {
  let totalOrder = 0;
  const showCart = useSelector((state) => state.showCart);
  //const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  let cart = [];
  const stringCart = localStorage.getItem("cart");
  if (stringCart) cart = JSON.parse(stringCart);

  const [cartState, setCartState] = useState(cart);
  const [count, setCount] = useState();
  const history = useHistory();

  function handleCloseOnClick() {
    dispatch(toggleShowCart(false));
  }

  function handleRemove(id) {
    dispatch(removeCartProduct(id));
    setCartState(cartState.filter((item) => item.id !== id));
  }

  function handleMinus(id, quantity) {
    if (quantity === 1) handleRemove(id);
    quantity -= 1;
    dispatch(editCartProduct(id, quantity));
    setCount(
      cart.map((item) => (item.id === id ? (item.quantity = quantity) : null))
    );
  }

  function handlePlus(id, quantity) {
    // por si se quiere maximo de 10 por persona
    if (quantity === 10) return;
    quantity += 1;
    dispatch(editCartProduct(id, quantity));
    setCount(
      cart.map((item) => (item.id === id ? (item.quantity = quantity) : null))
    );
  }

  function formatNumber(number) {
    return new Intl.NumberFormat("es-ES", {
      style: "decimal",
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(number);
  }

  function formatDate(prevDate) {
    const date = new Date(prevDate + "T00:00:00");
    const options = { weekday: "long", day: "numeric", month: "numeric" };
    const formattedDate = date.toLocaleDateString("es-ES", options);
    return formattedDate;
  }

  function handleComprar() {
    if(cart.length === 0) {
      alert("Tu carrito esta vacío")
      return;
    }
      history.push('/comprar');
    handleCloseOnClick()
  }

  function handleEmptyCart() {
    dispatch(emptyCart());
    setCartState([])
  }

  const cartContent = cart.map((item) => {
    totalOrder = totalOrder + item.Price * item.quantity;

    return (
      <Box key={item.id}>
        <Box
          display="flex"
          sx={{ pt: 2, pb: 2 }}
          alignItems="start"
          justifyContent={"space-between"}
        >
          <Avatar
            src={item && item.Photo}
            sx={{ width: 80, height: 80 }}
            variant="square"
          />
          <Box
            display="flex"
            flexDirection={"column"}
            alignItems={"flex-start"}
            sx={{ mr: 1 }}
          >
            <Typography variant="body1" sx={{ pl: 1 }}>
              {item && item.name}
            </Typography>

            <Typography variant="body1" sx={{ pl: 1 }}>
              {item && formatDate(item.StartDate)}
            </Typography>
          </Box>

          <Typography
            variant="body1"
            display={"flex"}
            justifyContent={"space-between"}
            sx={{ pr: 2 }}
          >
            <button onClick={() => handleMinus(item.id, item.quantity)}>
              -
            </button>
            <div className="cart__item-quantity">{item && item.quantity}</div>
            <button onClick={() => handlePlus(item.id, item.quantity)}>
              +
            </button>
          </Typography>

          <Typography variant="body1" justifyContent={"end"} sx={{ pr: 2 }}>
            ${item && formatNumber(item.Price)}
          </Typography>

          <Typography variant="body1" justifyContent={"end"} sx={{ pr: 2 }}>
            ${item && item.Price && formatNumber(item.Price * item.quantity)}
          </Typography>
          <button onClick={() => handleRemove(item.id)}>
            <DeleteOutlined sx={{ fontSize: "medium" }} />
          </button>
        </Box>
        <Divider variant="subheader" />
      </Box>
    );
  });
  return (
    <Drawer
      open={showCart}
      //open="true"

      anchor="right"
      PaperProps={{
        sx: {
          width: 600,
          background: "#ffffffe0",
          borderRadius: 0,
        },
      }}
    >
      <Box
        sx={{ p: 2 }}
        display="flex"
        justifyContent={"center"}
        flexDirection="column"
        alignItems="center"
      >
        <Typography variant="h4" color="black">
          {cart.length ? "Tu Carrito" : "Tu Carrito está vacío"}
        </Typography>
      </Box>

      <Paper elevation={0} sx={{ mt: 2, width: "90%", padding: 4 }}>
        {cartContent}
      </Paper>

      <Box
        sx={{ p: 2 }}
        display="flex"
        justifyContent={"center"}
        flexDirection="column"
        alignItems="end"
      >
        <Typography variant="h6" color="black">
          TOTAL ${formatNumber(totalOrder)}
        </Typography>
      </Box>

      <Button
        sx={{ mt: 4, backgroundColor: `var(--color-orange)`, mr: 1, ml: 1 }}
        variant="contained"
        onClick={handleComprar}
      >
        COMPRAR
      </Button>
      <Button
        sx={{
          mt: 1,
          backgroundColor: `var(--color-violet)`,
          mr: 1,
          ml: 1,
          color: "white",
        }}
        onClick={() => handleEmptyCart()}
      >
        Vaciar Carrito
      </Button>

      <Button onClick={handleCloseOnClick}>Cerrar</Button>
    </Drawer>
  );
};

export default Cart;
