import {
  DateField,
  EmailField,
  NumberField,
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
  //   // SI hubiera customer, habría que despachar un get de customer, no de user. 
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
