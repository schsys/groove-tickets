import {
  Show,
  SimpleShowLayout,
  TextField,
  DateField,
  NumberField,
} from "react-admin";
import { UserAuth } from "../../context/AuthContext";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getDetailedUser } from "../../common/integrations/api";
import { Dashboard } from "../dashboard/dashboard";
import { Card, CardContent, CardHeader } from "@mui/material";

export const CustomerShow = () => {

  const { user } = UserAuth();

  const [apiUser, setApiUser] = useState({
    item: {},
    fetchStatus: "loading",
    error: null,
  });

  useEffect(() => {

    async function getApiUser(username) {
      const response = await getDetailedUser(username);
      // console.log("response, user: ", response);
      setApiUser(response);
    }

    getApiUser(user.email);
  }, [user]);

  if (apiUser.fetchStatus === "loading") {
    return <>
      <Card sx={{ mt: 1 }}>
        <CardContent>
          <p>Obteniendo datos...</p>
        </CardContent>
      </Card>
    </>
  }

  if (apiUser.fetchStatus === "failed") {
    return <>
      <Card sx={{ mt: 1 }}>
        <CardHeader title="Oops! Esto es embarazoso!" />
        <CardContent>
          <p>{apiUser.error && apiUser.error.message}</p>
          <NavLink to="/">Volver</NavLink>
        </CardContent>
      </Card>
    </>
  }

  return <>
    <Dashboard />
    <Show title="Datos personales" id={apiUser.item.Customer.id}>
      <SimpleShowLayout>
        <TextField source="address" label="Dirección" />
        <TextField source="city" label="Ciudad" />
        <TextField source="state" label="Provincia" />
        <NumberField source="zip" label="Código Postal" />
        <TextField source="telephone" label="Teléfono" />
        <TextField source="document" label="Documento" />
        <DateField source="birthDate" label="Fecha de nacimiento" />
      </SimpleShowLayout>
    </Show>
  </>
};
