import { useCallback } from 'react';
import {
  Edit,
  SimpleForm,
  TextInput,
  required,
  DateInput,
  NumberInput,
  useNotify,
  useUpdate,
  useRedirect
} from "react-admin";
import { Box } from "@mui/material";
import { CustomToolbar } from "../custom-toolbar";

export const CustomerEdit = () => {
  const redirect = useRedirect();
  const notify = useNotify();

  const [update] = useUpdate();
  const save = useCallback(
      async values => {
          try {

              console.log('New data: ');
              console.table(values);
              await update(
                  'customers',
                  { id: values.id, data: values },
                  { returnPromise: true }
              );

              notify('ra.notification.updated', {
                  type: 'info',
                  messageArgs: { smart_count: 1 },
              });
              redirect('list', 'customers');
          } catch (error) {
              console.table(error);
              if (error.body && error.body.errors) {
                  return error.body.errors;
              }

              if (error.body && error.body.validationError) {
                  notify(error.body.validationError, {
                      type: 'error'
                  });
                  return '';
              } else {
                  notify('Ooops! Error validating data', {
                      type: 'error'
                  });
                  return '';
              }
          }
      },
      [update, notify, redirect]
  );

  return (
    <Edit title="Cuenta">
      <SimpleForm toolbar={<CustomToolbar />} onSubmit={save}>
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={2}>
            <TextInput
              source="name"
              label="Nombre y Apellido"
              validate={required()}
              fullWidth
            />
          </Box>
          <Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
            <DateInput source="birthDate" label="Fecha de nacimiento" fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1}>
            <TextInput
              source="address"
              label="Dirección"
              fullWidth
            />
          </Box>
          <Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
            <TextInput
              source="city"
              label="Ciudad"
              fullWidth
            />
          </Box>
        </Box>
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={2}>
            <TextInput
              source="state"
              label="Provincia"
              fullWidth
            />
          </Box>
          <Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
            <NumberInput
              source="zip"
              label="Código postal"
              fullWidth
            />
          </Box>
        </Box>
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1}>
            <TextInput
              source="telephone"
              label="Teléfono"
              validate={required()}
              fullWidth />
          </Box>
          <Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
            <NumberInput
              source="document"
              label="Documento"
              validate={required()}
              fullWidth />
          </Box>
        </Box>
      </SimpleForm>
    </Edit>
  );
}
