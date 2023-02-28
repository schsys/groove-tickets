import {
    Datagrid,
    List,
    TextField,
    DateField,
    NumberField,
    SelectInput,
    DateInput,
} from 'react-admin';
import { UserAuth } from "../../context/AuthContext";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getDetailedUser } from "../../common/integrations/api";
import { Card, CardContent, CardHeader } from "@mui/material";

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

export const OrderList = () => {
    const { user } = UserAuth();

    const [apiUser, setApiUser] = useState({
        item: {},
        fetchStatus: "loading",
        error: null,
    });

    useEffect(() => {

        async function getApiUser(username) {
            const response = await getDetailedUser(username);
            // console.log("response, user: ", response);
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
            filters={orderFilters}
            sort={{ field: 'orderDate', order: 'DESC' }}
            queryOptions={{ meta: { resource: `${apiUser.item.Customer.id}/orders` } }}
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
    );
}

