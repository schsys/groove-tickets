import React, { useEffect, useState } from "react";
import moment from "moment-timezone";
// import { getTotalItems } from "../../redux/actions";
// import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./Order.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";

export const ItemsOrder = (customer) => {

  console.log("Customer: ", customer)
  /*------------------------------Datos de los items de la orden----------------------------*/
  const auth = getAuth();
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
        const response = await axios.get(
          `http://localhost:3001/orders?status=Created&userName=${user.email}`
        );
        const id = response.data.Id;
        const items = response.data.OrderItems.map((item) => {
          const { Product, Quantity, UnitPrice } = item;
          const { Photos, Name, StartDate } = Product;
          const formattedStartDate = moment.tz(
            StartDate,
            "America/Argentina/Buenos_Aires"
          );

          return {
            id: id,
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
  /*------------------------------------------------------------------------------*/

  
  const handleMPago = async () => {
    
    const order = {
      id: orderItems.id,
      TotalAmount: orderItems.totalAmount,
      customerName: customer.name,
      customerEmail: customer.email,
    };
    console.log("Order para MercadoPago: ", order)
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
                className="editItems_order-minus"
                onClick={() => updateItemQuantity(index, item.quantity - 1, 0)}
                disabled={item.quantity <= 0}
              >
                -
              </button>
              <> {item && item.quantity} </>
              <button
                className="editItems_order-plus"
                onClick={() => updateItemQuantity(index, item.quantity + 1, 10)}
                disabled={item.quantity >= 10}
              >
                +
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
