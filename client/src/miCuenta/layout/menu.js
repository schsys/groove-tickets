import * as React from "react";
import { MenuItemLink } from "react-admin";
import PersonIcon from "@mui/icons-material/Person";
import ReceiptIcon from '@mui/icons-material/Receipt';
import ReviewsIcon from '@mui/icons-material/Reviews';

export const Menu = () => {
  return (
    <div>
      <MenuItemLink
        to="/customers"
        primaryText="Datos personales"
        leftIcon={<PersonIcon />}
      />
      <MenuItemLink
        to="/orders"
        primaryText="Pedidos"
        leftIcon={<ReceiptIcon />}
      />
      <MenuItemLink
        to="/reviews"
        primaryText="Reviews"
        leftIcon={<ReviewsIcon />}
      />
    </div>
  );
};
