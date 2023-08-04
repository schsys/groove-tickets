import React from "react";
import {
    Datagrid,
    List,
    TextField,
    DateField,
    NumberField,
    SelectInput,
    DateInput,
} from 'react-admin';
import { PrivateContent } from "../../components/Authentication/PrivateContent";

const orderFilters = [
    <SelectInput source="status" label="Estado" choices={[
        { id: "Created", name: "Creada" },
        { id: "Processing", name: "Procesando" },
        { id: "Canceled", name: "Cancelada" },
        { id: "Completed", name: "Completada" },
    ]} alwaysOn />,
    <DateInput source="date_gte" label="Fecha desde" alwaysOn />,
    <DateInput source="date_lte" label="Fecha hasta" alwaysOn />
];

export const OrderList = () =>
    <PrivateContent>
        {props =>
            <List
                filters={orderFilters}
                sort={{ field: 'orderDate', order: 'DESC' }}
                queryOptions={{ meta: { resource: `${props.customerId}/orders` } }}
                title="Pedidos"
                exporter={false}
            >
                <Datagrid
                    rowClick="show"
                    bulkActionButtons={false}
                    size="medium"
                // sx={{
                //     '& .column-status': { textAlign: 'right' },
                // }}
                >
                    <TextField source="id" label="N° Pedido" />
                    <DateField source="orderDate" label="Fecha" />
                    {/* <DateField source="shippingDate" label="Despachado el" /> */}
                    <TextField source="status" label="Estado" />
                    <NumberField source="totalAmount" label="Importe" />
                </Datagrid>
            </List>
        }
    </PrivateContent>

