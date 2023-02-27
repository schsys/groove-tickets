import {
  Datagrid,
  List,
  ReferenceField,
  TextField,
  FunctionField,
} from "react-admin";
import StarRatingField from "./star-rating-field";
import React, { useState, useEffect } from "react";
import { getDetailedUser } from "../../common/integrations/api";
import { NavLink } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { Card, CardContent, CardHeader } from "@mui/material";

// const reviewFilters = [
//   <ReferenceInput source="productId" reference="products" alwaysOn>
//     <AutocompleteInput filterToQuery={(searchText) => ({ name: searchText })} />
//   </ReferenceInput>,
// ];

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

  return (
    <List 
    /* filters={reviewFilters}  */
    sort={{ field: "status", order: "ASC" }}
    queryOptions={{ meta: { resourceId: apiUser.item.id } }}
    >
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <StarRatingField size="small" />
        <FunctionField
          source="message"
          label="Review"
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
        {/* <ReferenceField source="productId" reference="products">
          <TextField source="name" />
        </ReferenceField> */}
        <TextField source="status" label="Status" />
      </Datagrid>
    </List>
  );
};
