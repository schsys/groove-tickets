import {
  DateField,
  EmailField,
  NumberField,
  PasswordInput,
  Show,
  SimpleShowLayout,
  TextField,
} from "react-admin";

import { UserAuth } from "../../context/AuthContext";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getDetailedUser } from "../../common/integrations/api";


export const UserDetail = () => {
  const { user } = UserAuth();

  const [apiUser, setApiUser] = useState({
    item: {},
    fetchStatus: "loading",
    error: null,
  });

  useEffect(() => {
    console.log("Account useEffect()");

    async function getApiUser(username) {
      const response = await getDetailedUser(username);
      console.log("response, user: ", response);
      setApiUser(response);
    }

    getApiUser(user.email);
  }, [user]);

  if (apiUser.fetchStatus === "loading") {
    return (
      <>
        <p>Obteniendo datos...</p>
      </>
    );
  }

  if (apiUser.fetchStatus === "failed") {
    return (
      <>
        <p>Oops! Esto es embarazoso! </p>
        <p>{apiUser.error && apiUser.error.message}</p>
        <NavLink to="/">Volver</NavLink>
      </>
    );
  }

  console.log("apiUser.item.customer: ", apiUser.item.Customer);
  // {
  //   apiUser.item.Customer ? (
  //     <Show title="User Detail" id={apiUser.item.Customer.id}>
  //       <SimpleShowLayout>
  //         <TextField source="name" label="Nombre" />
  //         <TextField source="address" label="Dirección" />
  //         <TextField source="city" label="Ciudad" />
  //         <TextField source="state" label="Provincia" />
  //         <NumberField source="zip" label="Código Postal" />
  //         <EmailField source="email" label="Email" />
  //         <TextField source="telephone" label="Teléfono" />
  //         <TextField source="document" label="Documento" />
  //         <DateField source="birthDate" label="Fecha de nacimiento" />
  //         <TextField source="status" label="Estado" />
  //       </SimpleShowLayout>
  //     </Show>
  //   ) : (
  //     <Show title="User Detail" id={apiUser.item.id}>
  //       <SimpleShowLayout>
  //         <TextField source="userName" />
  //         <TextField source="role" />
  //         <TextField source="status" />
  //       </SimpleShowLayout>
  //     </Show>
  //   );
  // }

  return (
    <Show title="User Detail" id={apiUser.item.id}>
      <SimpleShowLayout>
        <TextField source="userName" />
        <TextField source="role" />
        <TextField source="status" />
        {/* <PasswordInput source="password" /> */}
      </SimpleShowLayout>

      <SimpleShowLayout source="Customer">
        <TextField source="Customer.name" label="Nombre" />
        <TextField source="Customer.address" label="Dirección" />
        <TextField source="Customer.city" label="Ciudad" />
        <TextField source="Customer.state" label="Provincia" />
        <NumberField source="Customer.zip" label="Código Postal" />
        <EmailField source="Customer.email" label="Email" />
        <TextField source="Customer.telephone" label="Teléfono" />
        <TextField source="Customer.document" label="Documento" />
        <DateField source="Customer.birthDate" label="Fecha de nacimiento" />
        <TextField source="Customer.status" label="Estado" />
      </SimpleShowLayout>
   {apiUser.item.Customer && (
        <SimpleShowLayout>
          {/* Como acceder a las propiedades de Customer? */}
          <TextField source="name" label="Nombre" />
          <TextField source="address" label="Dirección" />
          <TextField source="city" label="Ciudad" />
          <TextField source="state" label="Provincia" />
          <NumberField source="zip" label="Código Postal" />
          <EmailField source="email" label="Email" />
          <TextField source="telephone" label="Teléfono" />
          <TextField source="document" label="Documento" />
          <DateField source="birthDate" label="Fecha de nacimiento" />
          <TextField source="status" label="Estado" />
        </SimpleShowLayout>
      )}
    </Show>
  );
};
