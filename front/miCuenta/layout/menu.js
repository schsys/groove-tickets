import * as React from "react";
import { MenuItemLink } from "react-admin";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ReviewsIcon from '@mui/icons-material/Reviews';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import Swal from "sweetalert2";
import { UserAuth } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";

export const Menu = () => {
  const history = useHistory();
  const { logout } = UserAuth();

  const handleLogout = async () => {
    await logout();

    Swal.fire({
      title: "Yazz",
      html: "<h3>Gracias, te esperamos la próxima</h3>",
    });
    history.push("/");
  };

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
      <MenuItemLink to="" onClick={() => history.push("/")} primaryText="Back to site" leftIcon={<HomeIcon />} />
      <MenuItemLink to="" onClick={handleLogout} primaryText="Logout" leftIcon={<LogoutIcon />} />
    </div>
  );
};
