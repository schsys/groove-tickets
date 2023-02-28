import {
  Datagrid,
  List,
  TextField,
  FunctionField,
  DateField,
  SimpleShowLayout,
  RichTextField,
} from "react-admin";
import StarRatingField from "./star-rating-field";
import React, { useState, useEffect } from "react";
import { getDetailedUser } from "../../common/integrations/api";
import { NavLink } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { Card, CardContent, CardHeader } from "@mui/material";

const ReviewShow = () => (
  <SimpleShowLayout>
    <RichTextField source="message" label={false} />
  </SimpleShowLayout>
)

export const ReviewList = () => {
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
    <List
      sort={{ field: "createdAt", order: "DESC" }}
      queryOptions={{ meta: { resource: `${apiUser.item.id}/reviews` } }}
      title="Reviews"
      exporter={false}
    >
      <Datagrid
        bulkActionButtons={false}
        expand={<ReviewShow />}
        size="medium"
      >
        <StarRatingField size="small" label="Puntaje" />
        <TextField source="Product.name" label="Producto" />
        <FunctionField
          source="message"
          label="Opinión"
          render={(record) => {
            if (record.message && record.message.length <= 20) {
              return record.message;
            }
            if (record.message) {
              return record.message.slice(0, 30) + "...";
            }
            return "";
          }}
        />
        <DateField source="createdAt" label="Fecha de Creación" showTime />
        <DateField source="updatedAt" label="Fecha de Actualización" showTime />
      </Datagrid>
    </List>
  </>
};
