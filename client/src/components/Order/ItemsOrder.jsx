import React, { useEffect, useState } from "react";
import moment from "moment-timezone";

import axios from "axios";
import "./Order.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { useDispatch } from "react-redux";
import {
  addEditCartProduct,
  getTotalItems,
  getCreatedOrderByUser,
} from "../../redux/actions";

export const ItemsOrder = (customer) => {
  /*------------------------------Datos de los items de la orden----------------------------*/
  const auth = getAuth();
  const dispatch = useDispatch();
  const [user, loadingUser] = useAuthState(auth);
  const [orderItems, setorderItems] = useState({
    id: 0,
    items: [],
    totalAmount: 0,
    fetchStatus: "loading",
  });

  useEffect(() => {
    async function fetchOrder() {
      try {
        getCreatedOrderByUser(user).then((order) => {
          const id = order.Id;
          const items = order.OrderItems.map((item) => {
            const { ProductId, Product, Quantity, UnitPrice } = item;
            const { Photos, Name, StartDate } = Product;
            const formattedStartDate = moment.tz(
              StartDate,
              "America/Argentina/Buenos_Aires"
            );

            return {
              id: ProductId,
              name: Name,
              Photos: Photos,
              startDate: formattedStartDate,
              price: UnitPrice,
              quantity: Quantity,
              unitPrice: UnitPrice,
            };
          });
          const totalAmount = items.reduce(
            (acc, cur) => acc + Number(cur.price) * cur.quantity,
            0
          );
          setorderItems({
            id,
            items,
            totalAmount,
            fetchStatus: "succeeded",
          });
        });
      } catch (error) {
        console.error(error);
        setorderItems({
          id: 0,
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
  const updateItemQuantity = async (
    quantityToUpdate,
    index,
    newQuantity,
    defaultValue
  ) => {
    const items = [...orderItems.items];
    const item = items[index];
    await addEditCartProduct(item.id, quantityToUpdate, user).then(() => {
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

      dispatch(getTotalItems(user));
    });
  };
  /*------------------------------------------------------------------------------*/

  const handleMPago = async () => {
    const order = {
      id: orderItems.id,
      TotalAmount: orderItems.totalAmount,
      customerName: customer.name,
      customerEmail: customer.email,
    };
    try {
      await axios
        .post("/pay/mercadopago", order)
        .then(
          (res) => (window.location.href = res.data.response.body.init_point)
        )
        .then(await axios.get("/payment"));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="cartSummary__summary-Container">
      <h2 className="cartSummary__summary-header">TU CUENTA</h2>
      {orderItems.items.map((item, index) => {
        return (
          <div className="cartSummary__show-Container" key={index}>
            <img
              src={item && item.Photos[0].Path}
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
                onClick={() =>
                  updateItemQuantity(1, index, item.quantity + 1, 10)
                }
                onMouseDown={(event) => {
                  if (item.quantity >= 10) {
                    event.preventDefault();
                    alert("La cantidad máxima permitida por producto es 10 🙂");
                  }
                }}
              >
                +
              </button>
              <span class="item-quantity">{item && item.quantity}</span>
              <button
                className="editItems_order-minus"
                onClick={() =>
                  updateItemQuantity(-1, index, item.quantity - 1, 1)
                }
                onMouseDown={(event) => {
                  if (item.quantity <= 1) {
                    event.preventDefault();
                    alert(
                      "😯¡Oh! Si quieres eliminar este ítem. Hazlo desde tu carrito😊"
                    );
                  }
                }}
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
      <button onClick={handleMPago} className="cartSummary__show-processOrder">
        PAGAR
      </button>
    </div>
  );
};
