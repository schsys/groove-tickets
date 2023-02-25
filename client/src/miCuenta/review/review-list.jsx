import {
  Datagrid,
  List,
  ReferenceField,
  TextField,
  ReferenceInput,
  AutocompleteInput,
  FunctionField,
  NumberInput,
} from "react-admin";
import StarRatingField from "./star-rating-field";
import React, { useState, useEffect } from "react";
import { getDetailedUser } from "../../common/integrations/api";
import { NavLink } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";

const reviewFilters = [
  <ReferenceInput source="productId" reference="products" alwaysOn>
    <AutocompleteInput filterToQuery={(searchText) => ({ name: searchText })} />
  </ReferenceInput>,
];

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
  return (
    <List filters={reviewFilters} sort={{ field: "status", order: "ASC" }}>
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
        <ReferenceField source="productId" reference="products">
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField source="userId" reference="users">
          <TextField source="userName" />
        </ReferenceField>
        <TextField source="status" label="Status" />
      </Datagrid>
    </List>
  );
};
