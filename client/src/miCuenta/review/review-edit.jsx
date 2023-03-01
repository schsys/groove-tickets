import {
  Edit,
  SimpleForm,
  TextInput,
  required,
  NumberInput,
  TextField,
} from "react-admin";
import { Box } from "@mui/material";

export const ReviewEdit = () => (
  <Edit>
    <SimpleForm>
      <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
        <TextField source="Product.name" label="Product" />
      </Box>
      <Box display={{ xs: "block", sm: "flex", width: "50%" }}>
        <NumberInput
          source="stars"
          label="Stars"
          min={1}
          max={5}
          validate={required()}
          fullWidth
        />
      </Box>
      <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
        <TextInput
          source="message"
          label="Message"
          validate={required()}
          fullWidth
          resettable
          multiline
        />
      </Box>
    </SimpleForm>
  </Edit>
);
