import * as React from "react";
import { DashboardMenuItem, MenuItemLink } from "react-admin";
import BookIcon from "@mui/icons-material/Book";
import PeopleIcon from "@mui/icons-material/People";
import LabelIcon from "@mui/icons-material/Label";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { MenuItem } from "@mui/material";
import Swal from "sweetalert2";
import Error_Search from "../../assets/Error_Search.jpg";
import { UserAuth } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";

export const Menu = () => {
  const { logout } = UserAuth();
  const history = useHistory();

  const LogoutMessage = () => {
    Swal.fire({
      imageUrl: Error_Search,
      imageHeight: 150,
      imageWidth: 200,
      imageAlt: "Usuasio deslogueado.",
      title: "Yazz",
      html: "<h3>Gracias, te esperamos la próxima</p>",
      footer: "<p>Podés seguir navegando.</p>",
    });
  };

  const handleLogout = async () => {
    try {
      await logout();
      LogoutMessage();
      history.push("/"); //despues redirige para ver todo
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <div>
      <DashboardMenuItem />
      <MenuItemLink
        to="/customers"
        primaryText="Customer"
        leftIcon={<LabelIcon />}
      />
      <MenuItemLink to="/user" primaryText="User" leftIcon={<PeopleIcon />} />
      <MenuItemLink
        to="/orders"
        primaryText="Order"
        leftIcon={<BookmarkBorderIcon />}
      />
      <MenuItemLink
        to="/reviews"
        primaryText="Review"
        leftIcon={<BookIcon />}
      />
      <MenuItem>
        <p onClick={handleLogout}>Cerrar sesión</p>
      </MenuItem>
    </div>
  );
};
