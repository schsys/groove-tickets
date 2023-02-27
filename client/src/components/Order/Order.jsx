import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { Link } from "react-router-dom";
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
import "./Order.css";
import { ItemsOrder } from "./ItemsOrder";
const apiUrl = process.env.REACT_APP_BASE_URL;

export const Order = () => {
  // Logged user
  const auth = getAuth();
  const [user, loadingUser] = useAuthState(auth);
  const [customer, setCustomer] = useState({
    customerInfo: {},
    fetchStatus: "loading",
    error: null,
    editing: false,
  });
  /*----------------------------Datos de usuario----------------------------------*/
  useEffect(() => {
    async function fetchCustomer() {
      try {
        const response = await axios.get(
          `${apiUrl}/orders?status=Created&userName=${user.email}`
        );
        const customerInfo = {
          customerId: response.data.Customer.Id,
          name: response.data.Customer.Name,
          address: response.data.Customer.Address,
          city: response.data.Customer.City,
          state: response.data.Customer.State,
          zip: response.data.Customer.Zip,
          email: response.data.Customer.Email,
          telephone: response.data.Customer.Telephone,
        };

        setCustomer({
          customerInfo: customerInfo,
          fetchStatus: "success",
          error: null,
        });
      } catch (error) {
        setCustomer((customer) => ({
          ...customer,
          fetchStatus: "failed",
          customerInfo: {},
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
  /*----------------------------Modificación de datos----------------------------------*/
  const [editing, setEditing] = useState(false);
  function handleEditClick() {
    setEditing(true);
    setCustomer((customer) => ({
      ...customer,
      editing: true,
      tempItem: customer.customerInfo,
    }));
  }
  const customerItem = customer.editing
    ? customer.tempItem
    : customer.customerInfo;
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
        `${apiUrl}/customers/${customer.customerInfo.customerId}`,
        customer.tempItem
      );
      // Actualizar el estado local con los datos actualizados
      setEditing(false);
      setCustomer((customer) => ({
        ...customer,
        editing: false,
        customerInfo: customer.tempItem,
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
  const { customerInfo } = customer;

  return (
    <div className="cartSummary-Container">
      <div className="cartSummary__user-infoContainer">
        <div className="back_button-div">
          <Link to="/" className="back_button-order">
            Seguir Comprando
          </Link>
        </div>
        <h3 className="cartSummary__user-header">
          TUS DATOS
          <button
            className="cartSummary__user-editInfo"
            onClick={handleEditClick}
          >
            <EditIcon className="icon_editInfo" />
          </button>
          {editing && (
            <>
              <button
                className="cartSummary__user-editInfo-save"
                onClick={handleSave}
              >
                <FaSave /> Guardar cambios
              </button>
              <button
                className="cartSummary__user-editInfo-cancel"
                onClick={handleCancel}
              >
                <FaTimesCircle /> Cancelar
              </button>
            </>
          )}
        </h3>

        <div className="cartSummary__user-info">
          <div className="name">
            <h3 id="name">
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
          </div>
          <div className="email_container">
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
                          "Ingresa un correo válido. Ejemplo: ejemplo@gmail.com.";
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
          </div>
          <div className="address_container">
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
                      tempItem: {
                        ...customer.tempItem,
                        address: e.target.value,
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
          </div>
          <div className="telephone_container">
            <h3>
              <FaPhoneAlt /> Teléfono:{" "}
              {editing ? (
                <input
                  type="text"
                  pattern="^[-+]?[0-9]+$"
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
                          "Ingresa un número de teléfono válido";
                      } else {
                        const errorSpan = document.createElement("span");
                        errorSpan.innerHTML =
                          "Ingresa un número de teléfono válido";
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
          <div className="city_container">
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
                <input id="city" type="text" value={city} disabled />
              )}{" "}
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
                <input id="state" type="text" value={state} disabled />
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
                <input id="zip" type="text" value={zip} disabled />
              )}{" "}
            </h3>
          </div>
        </div>
      </div>
      <div>
        <ItemsOrder customer={customerInfo} />
      </div>
    </div>
  );
};
