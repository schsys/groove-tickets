import {
  Edit,
  SimpleForm,
  TextInput,
  SelectInput,
  required, 
  ReferenceInput,
  DateInput,
  NumberInput,
} from "react-admin";
import { Box } from "@mui/material";
import { CustomToolbar } from "../custom-toolbar";

export const UserEdit = () => (
  <Edit>
    <SimpleForm sx={{ width: "100%" }} toolbar={<CustomToolbar />}>
      <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
      </Box>

      <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
        <Box flex={2} mr={{ xs: 0, sm: "0.5em" }}>
          <TextInput source="Customer.name" label="Nombre" validate={required()} fullWidth />
        </Box>
      </Box>
      <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
        <Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
          <TextInput
            source="Customer.address"
            label="Dirección"
            validate={required()}
            fullWidth
          />
        </Box>
        <Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
          <TextInput
            source="Customer.city"
            label="Ciudad"
            validate={required()}
            fullWidth
          />
        </Box>
        <Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
          <TextInput
            source="Customer.state"
            label="Provincia"
            validate={required()}
            fullWidth
          />
        </Box>
        <Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
          <NumberInput
            source="Customer.zip"
            label="Código postal"
            validate={required()}
            fullWidth
          />
        </Box>
      </Box>
      <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
        <Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
          <TextInput source="Customer.email" label="Email" validate={required()} fullWidth />
        </Box>
        <Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
          <TextInput source="Customer.telephone" label="Teléfono" fullWidth />
        </Box>
        <Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
          <NumberInput source="Customer.document" label="Documento" fullWidth />
        </Box>
        <Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
          <DateInput source="Customer.birthDate" label="Fecha de nacimiento" fullWidth />
        </Box>
      </Box>

    </SimpleForm>
  </Edit>
);
