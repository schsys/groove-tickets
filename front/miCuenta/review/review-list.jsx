import React from "react";
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
import { PrivateContent } from "../../components/Authentication/PrivateContent";

const ReviewShow = () => (
  <SimpleShowLayout>
    <RichTextField source="message" label={false} />
  </SimpleShowLayout>
)

export const ReviewList = () =>
  <PrivateContent>
    {props =>
      <List
        sort={{ field: "createdAt", order: "DESC" }}
        queryOptions={{ meta: { resource: `${props.userId}/reviews` } }}
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
    }
  </PrivateContent>
