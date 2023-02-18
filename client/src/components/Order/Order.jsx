import React, { useEffect, useState } from "react";
import { Redirect, Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import moment from "moment-timezone";
import {
  FaUserAlt,
  FaMailBulk,
  FaDirections,
  FaCity,
  FaPhoneAlt,
  FaSave,
  FaTimesCircle,
} from "react-icons/fa";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { postOrder } from "./api";

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

  /*--------------------Actualizar cantidad del item quantity----------------------------*/
  const [showUpdateButton, setShowUpdateButton] = useState(false);
  const [newQuantity, setNewQuantity] = useState(null);
  const handleQuantityChange = (e) => {
    setNewQuantity(e.target.value);
    setShowUpdateButton(true);
  };
  const updateItemQuantity = (index, newQuantity) => {
    const newItems = [...orderItems.items];
    newItems[index].quantity = newQuantity;
    const newTotalAmount = newItems.reduce(
      (acc, cur) => acc + Number(cur.price) * cur.quantity,
      0
    );
    setorderItems({
      ...orderItems,
      items: newItems,
      totalAmount: newTotalAmount,
    });
    setShowUpdateButton(false);
    sendOrder();
  };
  const sendOrder = async () => {
    try {
      const response = await axios.put("http://localhost:3001/admin/orders/1", {
        OrderItems: orderItems.items.map((item) => ({
          ProductId: item.ProductId,
          quantity: item.quantity,
        })),
      });
      window.alert("Orden actualizada con pexito:", response.data);
    } catch (error) {
      window.alert("Error al actualizar la orden: " + error);
    }
  };
  /*------------------------------Datos de los items de la orden----------------------------*/
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
    editing: false,
  });
  /*----------------------------Modificación de datos----------------------------------*/
  const [editing, setEditing] = useState(false);
  console.log("Angeeeeel", editing);
  function handleEditClick() {
    setEditing(true);
    setCustomer((customer) => ({
      ...customer,
      editing: true,
      tempItem: customer.item,
    }));
  }
  const customerItem = customer.editing ? customer.tempItem : customer.item;
  const name = customerItem["name"];
  const address = customerItem["address"];
  const email = customerItem["email"];
  const city = customerItem["city"];
  const state = customerItem["state"];
  const zip = customerItem["zip"];
  const telephone = customerItem["telephone"];

  async function handleSave() {
    try {
      // Enviar los datos actualizados al servidor
      await axios.put(
        "http://localhost:3001/admin/customers/1",
        customer.tempItem
      );
      // Actualizar el estado local con los datos actualizados
      setEditing(false);
      setCustomer((customer) => ({
        ...customer,
        editing: false,
        item: customer.tempItem,
      }));
      window.alert("Datos actualizados con éxito");
    } catch (error) {
      window.alert("Error al actualizar datos" + error);
    }
  }

  function handleCancel() {
    // Establecer editing en false y restaurar los datos originales
    setEditing(false);
    setCustomer((customer) => ({
      ...customer,
      editing: false,
      tempItem: {},
    }));
  }
  /*----------------------------Datos de usuario----------------------------------*/
  useEffect(() => {
    async function fetchCustomer(userName) {
      try {
        const response = await await axios.get(
          "http://localhost:3001/admin/orders/1"
        );
        const customerInfo = {
          name: response.data.Customer.name,
          address: response.data.Customer.address,
          city: response.data.Customer.city,
          state: response.data.Customer.state,
          zip: response.data.Customer.zip,
          email: response.data.Customer.email,
          telephone: response.data.Customer.telephone,
        };

        setCustomer({
          item: customerInfo,
          fetchStatus: "success",
          error: null,
        });
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
          <button
            className="cartSummary__user-editInfo"
            onClick={handleEditClick}
          >
            <EditIcon />
          </button>
          {editing && (
            <>
              <button
                className="cartSummary__user-editInfo"
                onClick={handleSave}
              >
                <FaSave /> Guardar cambios
              </button>
              <button
                className="cartSummary__user-editInfo"
                onClick={handleCancel}
              >
                <FaTimesCircle /> Cancelar
              </button>
            </>
          )}
        </h2>

        <div className="cartSummary__user-info">
          <h3>
            <FaUserAlt /> Nombre:{" "}
            {editing ? (
              <input
                type="text"
                pattern="^[A-Za-zñÑáéíóúÁÉÍÓÚ\s]+$"
                maxLength="30"
                value={name}
                onChange={(e) =>
                  setCustomer((customer) => ({
                    ...customer,
                    tempItem: { ...customer.tempItem, name: e.target.value },
                  }))
                }
                onKeyUp={(e) => {
                  const input = e.target;
                  const value = input.value;
                  const pattern = new RegExp(input.getAttribute("pattern"));

                  if (!pattern.test(value)) {
                    const errorSpan = input.parentNode.querySelector("span");
                    if (errorSpan) {
                      errorSpan.innerHTML =
                        "Solo se permiten letras y espacios en blanco.";
                    } else {
                      const errorSpan = document.createElement("span");
                      errorSpan.innerHTML =
                        "Solo se permiten letras y espacios en blanco.";
                      errorSpan.style.color = "red";
                      input.parentNode.appendChild(errorSpan);
                    }
                  } else {
                    const errorSpan = input.parentNode.querySelector("span");
                    if (errorSpan) {
                      errorSpan.remove();
                    }
                  }
                }}
              />
            ) : (
              <input type="text" value={name} disabled />
            )}
          </h3>

          <h3>
            <FaMailBulk /> Email:{" "}
            {editing ? (
              <input
                type="email"
                pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                maxLength="30"
                value={email}
                onChange={(e) =>
                  setCustomer((customer) => ({
                    ...customer,
                    tempItem: { ...customer.tempItem, email: e.target.value },
                  }))
                }
                onKeyUp={(e) => {
                  const input = e.target;
                  const value = input.value;
                  const pattern = new RegExp(input.getAttribute("pattern"));

                  if (!pattern.test(value)) {
                    const errorSpan = input.parentNode.querySelector("span");
                    if (errorSpan) {
                      errorSpan.innerHTML =
                        "Ingresa un correo válido. Ejepmlo: ejemplo@gmail.com";
                    } else {
                      const errorSpan = document.createElement("span");
                      errorSpan.innerHTML =
                        "Ingresa un correo válido. Ejepmlo: ejemplo@gmail.com.";
                      errorSpan.style.color = "red";
                      input.parentNode.appendChild(errorSpan);
                    }
                  } else {
                    const errorSpan = input.parentNode.querySelector("span");
                    if (errorSpan) {
                      errorSpan.remove();
                    }
                  }
                }}
              />
            ) : (
              <input type="text" value={email} disabled />
            )}
          </h3>

          <h3>
            <FaDirections /> Dirección:{" "}
            {editing ? (
              <input
                type="text"
                maxLength="30"
                pattern="^[A-Za-z0-9\s]+$"
                value={address}
                onChange={(e) =>
                  setCustomer((customer) => ({
                    ...customer,
                    tempItem: { ...customer.tempItem, address: e.target.value },
                  }))
                }
                onKeyUp={(e) => {
                  const input = e.target;
                  const value = input.value;
                  const pattern = new RegExp(input.getAttribute("pattern"));

                  if (!pattern.test(value)) {
                    const errorSpan = input.parentNode.querySelector("span");
                    if (errorSpan) {
                      errorSpan.innerHTML =
                        "Solo se permiten números y letras.";
                    } else {
                      const errorSpan = document.createElement("span");
                      errorSpan.innerHTML =
                        "Solo se permiten números y letras.";
                      errorSpan.style.color = "red";
                      input.parentNode.appendChild(errorSpan);
                    }
                  } else {
                    const errorSpan = input.parentNode.querySelector("span");
                    if (errorSpan) {
                      errorSpan.remove();
                    }
                  }
                }}
              />
            ) : (
              <input type="text" value={address} disabled />
            )}
          </h3>

          <h3>
            <FaCity /> Ciudad:{" "}
            {editing ? (
              <input
                type="text"
                pattern="^[A-Za-zñÑáéíóúÁÉÍÓÚ\s]+$"
                maxLength="30"
                value={city}
                onChange={(e) =>
                  setCustomer((customer) => ({
                    ...customer,
                    tempItem: { ...customer.tempItem, city: e.target.value },
                  }))
                }
                onKeyUp={(e) => {
                  const input = e.target;
                  const value = input.value;
                  const pattern = new RegExp(input.getAttribute("pattern"));

                  if (!pattern.test(value)) {
                    const errorSpan = input.parentNode.querySelector("span");
                    if (errorSpan) {
                      errorSpan.innerHTML =
                        "Solo se permiten letras y espacios en blanco.";
                    } else {
                      const errorSpan = document.createElement("span");
                      errorSpan.innerHTML =
                        "Solo se permiten letras y espacios en blanco.";
                      errorSpan.style.color = "red";
                      input.parentNode.appendChild(errorSpan);
                    }
                  } else {
                    const errorSpan = input.parentNode.querySelector("span");
                    if (errorSpan) {
                      errorSpan.remove();
                    }
                  }
                }}
              />
            ) : (
              <input type="text" value={city} disabled />
            )}
            {editing ? (
              <input
                type="text"
                pattern="^[A-Za-zñÑáéíóúÁÉÍÓÚ\s]+$"
                maxLength="30"
                value={state}
                onChange={(e) =>
                  setCustomer((customer) => ({
                    ...customer,
                    tempItem: { ...customer.tempItem, state: e.target.value },
                  }))
                }
                onKeyUp={(e) => {
                  const input = e.target;
                  const value = input.value;
                  const pattern = new RegExp(input.getAttribute("pattern"));

                  if (!pattern.test(value)) {
                    const errorSpan = input.parentNode.querySelector("span");
                    if (errorSpan) {
                      errorSpan.innerHTML =
                        "Solo se permiten letras y espacios en blanco.";
                    } else {
                      const errorSpan = document.createElement("span");
                      errorSpan.innerHTML =
                        "Solo se permiten letras y espacios en blanco.";
                      errorSpan.style.color = "red";
                      input.parentNode.appendChild(errorSpan);
                    }
                  } else {
                    const errorSpan = input.parentNode.querySelector("span");
                    if (errorSpan) {
                      errorSpan.remove();
                    }
                  }
                }}
              />
            ) : (
              <input type="text" value={state} disabled />
            )}{" "}
            {editing ? (
              <input
                type="text"
                pattern="^[0-9]+$"
                maxLength="5"
                value={zip}
                onChange={(e) =>
                  setCustomer((customer) => ({
                    ...customer,
                    tempItem: { ...customer.tempItem, zip: e.target.value },
                  }))
                }
                onKeyUp={(e) => {
                  const input = e.target;
                  const value = input.value;
                  const pattern = new RegExp(input.getAttribute("pattern"));

                  if (!pattern.test(value)) {
                    const errorSpan = input.parentNode.querySelector("span");
                    if (errorSpan) {
                      errorSpan.innerHTML = "Solo se permiten números.";
                    } else {
                      const errorSpan = document.createElement("span");
                      errorSpan.innerHTML = "Solo se permiten números.";
                      errorSpan.style.color = "red";
                      input.parentNode.appendChild(errorSpan);
                    }
                  } else {
                    const errorSpan = input.parentNode.querySelector("span");
                    if (errorSpan) {
                      errorSpan.remove();
                    }
                  }
                }}
              />
            ) : (
              <input type="text" value={zip} disabled />
            )}{" "}
          </h3>
          <h3>
            <FaPhoneAlt /> Teléfono:{" "}
            {editing ? (
              <input
                type="text"
                pattern="^[0-9]+$"
                maxLength="15"
                value={telephone}
                onChange={(e) =>
                  setCustomer((customer) => ({
                    ...customer,
                    tempItem: {
                      ...customer.tempItem,
                      telephone: e.target.value,
                    },
                  }))
                }
                onKeyUp={(e) => {
                  const input = e.target;
                  const value = input.value;
                  const pattern = new RegExp(input.getAttribute("pattern"));

                  if (!pattern.test(value)) {
                    const errorSpan = input.parentNode.querySelector("span");
                    if (errorSpan) {
                      errorSpan.innerHTML =
                        "Ingresa un número de télefono válido";
                    } else {
                      const errorSpan = document.createElement("span");
                      errorSpan.innerHTML =
                        "Ingresa un número de télefono válido";
                      errorSpan.style.color = "red";
                      input.parentNode.appendChild(errorSpan);
                    }
                  } else {
                    const errorSpan = input.parentNode.querySelector("span");
                    if (errorSpan) {
                      errorSpan.remove();
                    }
                  }
                }}
              />
            ) : (
              <input type="text" value={telephone} disabled />
            )}{" "}
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
              <div>
                {orderItems.items.map((item, index) => (
                  <div key={index}>
                    <div>
                      <select
                        value={newQuantity || item.quantity}
                        onChange={handleQuantityChange}
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                      {showUpdateButton && (
                        <button
                          onClick={() =>
                            updateItemQuantity(
                              index,
                              newQuantity || item.quantity
                            )
                          }
                        >
                          Actualizar cantidad
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
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
