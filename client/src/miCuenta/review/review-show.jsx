import {
  Show,
  SimpleShowLayout,
  TextField,
  DateField,
} from "react-admin";
import StarRatingField from "./star-rating-field";

export const ReviewShow = () => (
  <Show title="Reviews">
    <SimpleShowLayout>
      <StarRatingField source="stars" label="Puntaje" />
      <TextField source="Product.name" label="Producto" />
      <TextField
        source="message"
        label="Opinión"
        fullWidth
      />
      <DateField source="createdAt" label="Fecha de Creación" showTime />
      <DateField source="updatedAt" label="Fecha de Actualización" showTime />
    </SimpleShowLayout>
  </Show>
);
