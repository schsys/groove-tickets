import {
  List,
  Datagrid,
  TextField,
  DateField,
  EditButton,
} from "react-admin";
import { UserAuth } from "../../context/AuthContext";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getDetailedUser } from "../../common/integrations/api";
import { UserCard } from "./user-card";
import { Card, CardContent, CardHeader } from "@mui/material";

export const CustomerList = () => {

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
    <UserCard customerName={apiUser.item.Customer.name} />
    <List
      queryOptions={{ meta: { resource: apiUser.item.Customer.id } }}
      exporter={false}
      pagination={false}
    >
      <Datagrid bulkActionButtons={false} size="medium">
        <TextField source="telephone" label="Teléfono" sortable={false} />
        <TextField source="document" label="Documento" sortable={false} />
        <TextField source="address" label="Dirección" sortable={false} />
        <TextField source="city" label="Ciudad" sortable={false} />
        <DateField source="birthDate" label="Fecha de Nacimiento" sortable={false} />
        <EditButton />
      </Datagrid>
    </List>
  </>
};
