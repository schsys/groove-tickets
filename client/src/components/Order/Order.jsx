import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
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

export const Order = () => {
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
    async function fetchCustomer() {
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

  return (
    <div className="cartSummary-Container">
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
      <div>
        <ItemsOrder />
      </div>
    </div>
  );
};
