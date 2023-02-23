import {
  Show,
  SimpleShowLayout,
  TextField,
  ReferenceField,
  DateField,
  NumberField,
  EmailField,
  SimpleList,
} from "react-admin";
import { useMediaQuery } from "@mui/material";
import { UserAuth } from "../../context/AuthContext";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getDetailedUser } from "../../common/integrations/api";

export const CustomerDetail = () => {

  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const { user } = UserAuth();
  
  const [apiUser, setApiUser] = useState({
    item: {},
    fetchStatus: "loading",
    error: null,
  });

  useEffect(() => {

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


  // const record = { id: 2, name: "John Doe", email: "john.doe@example.com" };
  return (
    <Show title="Customer Detail" id={apiUser.item.Customer.id}>
      {isSmall ? (
        <SimpleList
          primaryText={(customer) => customer.name}
          secondaryText={(customer) => customer.status}
          tertiaryText={(customer) => customer.email}
        />
      ) : (
        <SimpleShowLayout>
          <TextField source="name" label="Nombre" />
          <ReferenceField source="userId" label="Usuario" reference= "users">
            <TextField source="userName" />
          </ReferenceField>
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
