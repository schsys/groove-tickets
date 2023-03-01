import * as React from "react";
import { MenuItemLink } from "react-admin";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ReviewsIcon from '@mui/icons-material/Reviews';

export const Menu = () => {
  return (
    <div>
      <MenuItemLink
        to="/customers"
        primaryText="Cuenta"
        leftIcon={<AccountCircleIcon />}
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
