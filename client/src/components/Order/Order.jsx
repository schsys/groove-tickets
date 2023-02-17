import React, { useEffect, useState } from "react";
import { Redirect, NavLink, Link } from "react-router-dom";
import { Card, CardContent, Box /* Typography, Button */ } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import moment from "moment-timezone";

import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import { getCustomer, postOrder } from "./api";

/* import { OrderDetail } from "./OrderDetail";
import { OrderTotals } from "./OrderTotals"; */
import "./Order.css";

export const Order = () => {
  // Order data
  const [, /* order */ setOrder] = useState({
    item: {},
    status: "idle",
    error: null,
  });

  // Items in the cart
  const [orderItems, setorderItems] = useState({
    items: [],
    totalAmount: 0,
    fetchStatus: "loading",
  });

  useEffect(() => {
    async function fetchOrder() {
      try {
        const response = await axios.get(
          "http://localhost:3001/admin/orders/2"
        );
        const items = response.data.OrderItems.map((item) => {
          const { Product, quantity } = item;
          const { Photos, name, price, unitPrice, startDate } = Product;
          const formattedStartDate = moment.tz(
            startDate,
            "America/Argentina/Buenos_Aires"
          );

          return {
            name,
            Photos,
            startDate: formattedStartDate,
            price,
            quantity,
            unitPrice,
          };
        });
        const totalAmount = items.reduce(
          (acc, cur) => acc + Number(cur.price) * cur.quantity,
          0
        );
        setorderItems({
          items,
          totalAmount,
          fetchStatus: "succeeded",
        });
      } catch (error) {
        console.error(error);
        setorderItems({
          items: [],
          totalAmount: 0,
          fetchStatus: "failed",
        });
      }
    }

    fetchOrder();
  }, []);

  // Logged user
  const auth = getAuth();
  const [user, loadingUser] = useAuthState(auth);

  const [customer, setCustomer] = useState({
    item: {},
    fetchStatus: "loading",
    error: null,
  });

  useEffect(() => {
    console.log("Order useEffect() to fetch customer");
    console.log("logged user: ", user, loadingUser);

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

    if (!loadingUser && user) {
      fetchCustomer(user.email);
    }
  }, [user, loadingUser]);

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
      totalAmount: orderItems.totalAmount,
      items: orderItems.items.map((item) => ({
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
  console.log("Cartitems", orderItems);
  const isLoading = () =>
    loadingUser ||
    customer.fetchStatus === "loading" ||
    orderItems.fetchStatus === "loading";

  const userIsGuest = () => !loadingUser && !user;

  /*   const isCartEmpty = () =>
    orderItems.fetchStatus !== "loading" && orderItems.items.length === 0; */

  function formatNumber(number) {
    return new Intl.NumberFormat("es-ES", {
      style: "decimal",
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(number);
  }

  return (
    <div className="cartSummary-Container">
      {isLoading() && <p>Loading...</p>}
      {userIsGuest() && <Redirect to="/register" />}

      <div className="cartSummary__user-infoContainer">
        <h2 className="cartSummary__user-header">
          TUS DATOS
          <button className="cartSummary__user-editInfo">
            <EditIcon />
          </button>
        </h2>

        <div className="cartSummary__user-info">
          <h3>Nombre: {customer.name}</h3>
          <h3>Email: {customer.item.email}</h3>
          <h3>Dirección: {customer.item.address}</h3>
          <h3>
            Ciudad: {customer.item.city}, {customer.item.state}{" "}
            {customer.item.zip}{" "}
          </h3>
        </div>
      </div>
      <div className="cartSummary__summary-Container">
        <h2 className="cartSummary__summary-header">TU CUENTA</h2>
        {orderItems.items.map((item) => {
          //   totalOrder = totalOrder + item.Price * item.quantity;
          return (
            <div className="cartSummary__show-Container">
              <img
                src={item && item.Photos[0].path}
                alt="showImage"
                className="cartSummary__show-image"
              />
              <div className="cartSummary__show-nameDate">
                {item && item.name}
                <div>{item && item.startDate.format("DD/MM/YYYY")}</div>
              </div>
              <div>{item && item.quantity}</div>
              <div>${item && formatNumber(item.price)}</div>
              <div>
                $
                {item && item.price && formatNumber(item.price * item.quantity)}
              </div>
            </div>
          );
        })}
        <div className="cartSummary__show-totalOrder">
          <h4>TOTAL ${formatNumber(orderItems.totalAmount)}</h4>
        </div>
        <button className="cartSummary__show-processOrder">
          <Link
            onClick={handlePayment}
            className="cartSummary__show-processOrderButton"
          >
            PAGAR
          </Link>
        </button>
      </div>
    </div>
  );
};
