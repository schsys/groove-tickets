import React from "react";
import { useLocation } from "react-router-dom";
import { PrivateContent } from "../../components/Authentication/PrivateContent";
import { Card, CardContent, CardHeader } from "@mui/material";
import { CustomerEdit as CustomerEditAdmin } from '../../admin/customer/customer-edit';

export const CustomerEdit = () => {
  const location = useLocation();

  return <PrivateContent>
    {props => {
      if (location.hash !== `#/customers/${props.customerId}`) {
        return (
          <Card sx={{ mt: 1 }}>
            <CardHeader title={`Hola ${props.customerName}!`} />
            <CardContent>
              <p>La URL que intentas acceder no es válida</p>
            </CardContent>
          </Card>
        );
      }

      return <CustomerEditAdmin />;
    }}
  </PrivateContent>
};
