import {
  DateField,
  EmailField,
  Labeled,
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
import { Divider, GlobalStyles, Grid, Stack } from "@mui/material";

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

  // console.log("apiUser.item.customer: ", apiUser.item.Customer);

  return (
    <Show title="User Detail" id={apiUser.item.id}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <SimpleShowLayout >
            <GlobalStyles styles={{ h1: { color: "grey" } } } />
            <h1>User Details</h1>
            <Divider />
            <TextField source="userName" />
            <TextField source="role" />
            <TextField source="status" />
          </SimpleShowLayout>
        </Grid>
        <Grid item xs={6}>
          <SimpleShowLayout>
          <GlobalStyles styles={{ h1: { color: "grey" } }} />
            <h1>Customer Details</h1>
            <Divider />
            <TextField source="Customer.name" label="Nombre" />
            <TextField source="Customer.address" label="Dirección" />
            <TextField source="Customer.city" label="Ciudad" />
            <TextField source="Customer.state" label="Provincia" />
            <NumberField source="Customer.zip" label="Código Postal" />
            {/* <EmailField source="Customer.email" label="Email" /> */}
            <TextField source="Customer.telephone" label="Teléfono" />
            <TextField source="Customer.document" label="Documento" />
            <DateField
              source="Customer.birthDate"
              label="Fecha de nacimiento"
            />
            <TextField source="Customer.status" label="Estado" />
          </SimpleShowLayout>
        </Grid>
      </Grid>
      {/* <SimpleShowLayout >
        <TextField size="large"  label= "User Detail"/>
        <TextField source="userName" />
        <TextField source="role" />
        <TextField source="status" />
      </SimpleShowLayout>

      <SimpleShowLayout label= "Customer Detail" source="Customer">
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
      </SimpleShowLayout> */}
    </Show>
  );
};
