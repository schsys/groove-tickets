import React from "react";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  EditButton,
} from "react-admin";
import { PrivateContent } from "../../components/Authentication/PrivateContent";
import { UserCard } from "./user-card";

export const CustomerList = () => {
  return <PrivateContent>
    {props =>
      <>
        <UserCard customerName={props.customerName} />
        <List
          queryOptions={{ meta: { resource: props.customerId } }}
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
      </>}
  </PrivateContent>
};
