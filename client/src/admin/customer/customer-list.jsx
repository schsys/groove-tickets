import {
  Datagrid,
  List,
  TextField,
  TextInput,
  DateField,
  NumberField,
  SimpleList,
  ReferenceField
} from "react-admin";
import { useMediaQuery } from "@mui/material";

export const CustomerList = () => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const customerFilters = [
    <TextInput source="name" alwaysOn />,
  ];
  return (
    <List filters={customerFilters}>
      {isSmall ? (
        <SimpleList
          primaryText={(customer) => customer.name}
          secondaryText={(customer) => customer.status}
          tertiaryText={(customer) => customer.email}
        />
      ) : (
        <Datagrid rowClick="edit" bulkActionButtons={false}>
          <TextField source="name" />
          <TextField source="address" />
          <TextField source="city" />
          <TextField source="state" />
          <NumberField source="zip" />
          <ReferenceField source="userId" reference="users">
            <TextField source="userName" />
          </ ReferenceField>
          <TextField source="telephone" />
          <TextField source="document" />
          <DateField source="birthDate" />
        </Datagrid>
      )}
    </List>
  );
};
