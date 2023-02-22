import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment-timezone";
import axios from "axios";
import "./Order.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";

export const ItemsOrder = () => {
  /*------------------------------Datos de los items de la orden----------------------------*/
  const auth = getAuth();
  const [user, loadingUser] = useAuthState(auth);
  const [orderItems, setorderItems] = useState({
    items: [],
    totalAmount: 0,
    fetchStatus: "loading",
  });

  useEffect(() => {
    async function fetchOrder() {
      try {
        const response = await axios.get(
          "http://localhost:3001/admin/orders/1"
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

    if (!loadingUser && user) {
      fetchOrder(user.email);
    }
  }, [user, loadingUser]);

  function formatNumber(number) {
    return new Intl.NumberFormat("es-ES", {
      style: "decimal",
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(number);
  }

  /*--------------------Actualizar cantidad del item quantity----------------------------*/
  const updateItemQuantity = (index, newQuantity, defaultValue) => {
    const items = [...orderItems.items];
    const item = items[index];
    const quantity = newQuantity > 0 ? newQuantity : defaultValue;
    item.quantity = quantity;
    const totalAmount = items.reduce(
      (acc, cur) => acc + Number(cur.price) * cur.quantity,
      0
    );
    setorderItems({
      items,
      totalAmount,
      fetchStatus: "succeeded",
    });
  };

  const sendOrder = async () => {
    try {
      const response = await axios.put("http://localhost:3001/order/1/items", {
        OrderItems: orderItems.items.map((item) => ({
          ProductId: item.ProductId,
          quantity: 1,
        })),
      });
      window.alert("Orden actualizada con exito:", response.data);
    } catch (error) {
      window.alert("Error al actualizar la orden: " + error);
    }
  };
  return (
    <div className="cartSummary__summary-Container">
      <h2 className="cartSummary__summary-header">TU CUENTA</h2>
      {orderItems.items.map((item, index) => {
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

            <div>
              <button
                className="editItems_order-plus"
                onClick={() => updateItemQuantity(index, item.quantity + 1, 10)}
                disabled={item.quantity >= 10}
              >
                +
              </button>
              <>{item && item.quantity}</>
              <button
                className="editItems_order-minus"
                onClick={() => updateItemQuantity(index, item.quantity - 1, 0)}
                disabled={item.quantity <= 0}
              >
                -
              </button>
            </div>
            <div>${item && formatNumber(item.price)}</div>
            <div>
              ${item && item.price && formatNumber(item.price * item.quantity)}
            </div>
          </div>
        );
      })}
      <div className="cartSummary__show-totalOrder">
        <h4>TOTAL ${formatNumber(orderItems.totalAmount)}</h4>
      </div>
      <button className="cartSummary__show-processOrder">
        <Link className="cartSummary__show-processOrderButton">PAGAR</Link>
      </button>
    </div>
  );
};
