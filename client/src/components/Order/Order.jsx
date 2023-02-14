import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Card,
  CardContent,
  Box,
  Grid,
  Typography,
  Button,
} from "@mui/material";

import { useHistory } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";

import { getCustomer, postOrder } from "./api";

import { OrderDetail } from "./OrderDetail";
import { OrderTotals } from "./OrderTotals";

import "./EmptyCart.css";

export const Order = () => {
  // Order data
  const [order, setOrder] = useState({
    item: {},
    status: "idle",
    error: null,
  });

  // Items in the cart
  const [cartItems, setCartItems] = useState({
    items: [],
    totalAmount: 0,
    fetchStatus: "loading",
  });

  useEffect(() => {
    let stringCart = localStorage.getItem("cart");
    console.log("cart: ", JSON.parse(stringCart));

    if (stringCart) {
      const items = JSON.parse(stringCart);
      const totalAmount = items.reduce(
        (acc, cur) => acc + Number(cur.Price) * cur.quantity,
        0
      );

      setCartItems((cartItems) => ({
        ...cartItems,
        items,
        totalAmount,
        fetchStatus: "succeeded",
      }));
    }
  }, []);

  // Logged user
  const { user } = UserAuth();
  const history = useHistory();

  const [customer, setCustomer] = useState({
    item: {},
    fetchStatus: "loading",
    error: null,
  });

  useEffect(() => {
    console.log("Order useEffect() to fetch customer");
    console.log("logged user: ", user);

    async function fetchCustomer(userName) {
      try {
        const response = await getCustomer(userName);
        console.log("getCustomer", response);

        if (response.ok) {
          setCustomer((customer) => ({
            ...customer,
            fetchStatus: "succeeded",
            item: {
              ...response.data,
            },
          }));
        } else {
          // console.log('response: ', response);
          setCustomer((customer) => ({
            ...customer,
            fetchStatus: "failed",
            item: {},
            error: response.error,
          }));
        }
      } catch (error) {
        setCustomer((customer) => ({
          ...customer,
          fetchStatus: "failed",
          item: {},
          error: {
            message: "Error processing last action",
            status: error.response && error.response.status,
          },
        }));
      }
    }

    // Check user
    if (user === null) {
      history.push("/register");
    } else {
      fetchCustomer(user.email);
    }
  }, [user, history]);

  const clearCart = () => {
    localStorage.setItem("cart", "");
  };

  const handlePayment = async () => {
    // handle payment
    // MercadoPago...

    // handle saving order
    // customerId, shippingDate, totalAmount, items
    // item: productId, quantity, unitPrice, totalAmount
    // Save Order
    setOrder((order) => ({
      ...order,
      status: "processing",
    }));

    const data = {
      customerId: customer.item.id,
      totalAmount: cartItems.totalAmount,
      items: cartItems.items.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        unitPrice: Number(item.Price),
        totalAmount: Number(item.Price) * item.quantity,
      })),
    };
    console.log("order data: ", data);

    try {
      const response = await postOrder(data);

      if (response.ok) {
        clearCart();

        setOrder((order) => ({
          ...order,
          status: "succeeded",
          item: {
            ...response.data,
          },
        }));
      } else {
        setOrder((order) => ({
          ...order,
          status: "failed",
          item: {},
          error: response.error,
        }));
      }
    } catch (error) {
      setOrder((order) => ({
        ...order,
        status: "failed",
        item: {},
        error: {
          message: "Error processing last action",
          status: error.response && error.response.status,
        },
      }));
    }
  };

  const isLoading = () =>
    customer.fetchStatus === "loading" || cartItems.fetchStatus === "loading";

  const isCartEmpty = () =>
    cartItems.fetchStatus !== "loading" && cartItems.items.length === 0;

  if (isLoading() || Object.keys(user).length === 0) {
    return (
      <>
        <p>Loading...</p>
      </>
    );
  }

  if (isCartEmpty()) {
    return (
      <div className="emptyCart_container">
        <div className="emptyCart_info_div">
          <p className="emptyCart_text">El carrito está vacío!</p>
          <NavLink className="emptyCart_link" to="/">Ver shows</NavLink>
        </div>
      </div>
    );
  }

  return (
    <>
      <Box maxWidth="90%" margin="1em auto">
        <Card>
          <CardContent>
            <Content
              customer={customer}
              cartItems={cartItems.items}
              totalAmount={cartItems.totalAmount}
            />
            <Spacer />
            {order.status === "idle" && (
              <Button color="primary" type="button" onClick={handlePayment}>
                PAGAR
              </Button>
            )}
            {order.status === "processing" && <p>Procesando...</p>}
            {order.status === "succeeded" && (
              <>
                <p>El pedido se ha procesado correctamente!</p>
                <NavLink to="/">Seguir viendo más shows</NavLink>
              </>
            )}
            {order.status === "failed" && (
              <>
                <p>
                  Error al procesar el pedido! Por favor consulte con el
                  administrador del sitio
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

const Spacer = () => <Box m={1}>&nbsp;</Box>;

const CustomerDetails = ({ customer }) => {
  if (customer.fetchStatus === "succeeded") {
    return (
      <div>
        <Typography>{customer.item.name}</Typography>
        <Typography>{customer.item.email}</Typography>
      </div>
    );
  }
};

const CustomerAddress = ({ customer }) => {
  if (customer.fetchStatus === "succeeded") {
    return (
      <div>
        {/* <Typography>
                    {record?.name}
                </Typography> */}
        <Typography>{customer.item.address}</Typography>
        <Typography>
          {customer.item.city}, {customer.item.state} {customer.item.zip}
        </Typography>
      </div>
    );
  }
};

const Content = ({ customer, cartItems, totalAmount }) => {
  return (
    <>
      <Grid container spacing={1} padding="0.5em">
        <Grid item xs={12} sm={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Resumen del pedido
          </Typography>
          <Spacer />
          <Typography variant="h6" gutterBottom>
            Información de facturación
          </Typography>
          <CustomerDetails customer={customer} />
          <Spacer />

          <Typography variant="h6" gutterBottom>
            Dirección
          </Typography>
          <CustomerAddress customer={customer} />
        </Grid>
      </Grid>
      <Spacer />

      <Typography variant="h6" gutterBottom padding="0.5em">
        Items
      </Typography>
      <div>
        <OrderDetail cartItems={cartItems} />
      </div>
      <Spacer />

      <Typography variant="h6" gutterBottom padding="0.5em">
        Totales
      </Typography>
      <div>
        <OrderTotals totalAmount={totalAmount} />
      </div>
    </>
  );
};
