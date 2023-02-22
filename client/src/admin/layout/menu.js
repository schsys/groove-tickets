import * as React from "react";
import { DashboardMenuItem, MenuItemLink } from "react-admin";
import { Button } from "@mui/material"
import BookIcon from "@mui/icons-material/Book";
// import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import PeopleIcon from "@mui/icons-material/People";
// import LabelIcon from "@mui/icons-material/Label";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GroupsIcon from '@mui/icons-material/Groups';
import CategoryIcon from '@mui/icons-material/Category';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import WifiCalling3Icon from '@mui/icons-material/WifiCalling3';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { MenuItem } from "@mui/material";

import { UserAuth } from "../../context/AuthContext";
import Swal from "sweetalert2";
import Error_Search from "../../assets/Error_Search.jpg";
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
      <MenuItemLink to="/artists" primaryText="Artists" leftIcon={<GroupsIcon />} />
      <MenuItemLink to="/locations" primaryText="Location" leftIcon={<LocationOnIcon />} />
      <MenuItemLink to="/categories" primaryText="Category" leftIcon={<CategoryIcon />} />
      <MenuItemLink to="/products" primaryText="Product" leftIcon={<SlideshowIcon />} />
      <MenuItemLink
        to="/users"
        primaryText="User"
        leftIcon={<PeopleIcon />}
      />
      <MenuItemLink to="/customers" primaryText="Customer" leftIcon={<WifiCalling3Icon />} />
      <MenuItemLink to="/orders" primaryText="Order" leftIcon={<BookmarkBorderIcon />} />
      <MenuItemLink
        to="/reviews"
        primaryText="Review"
        leftIcon={<BookIcon />}
      />
      <MenuItemLink to="/mailgen" primaryText="Notification" leftIcon={<NotificationsIcon />} />
      <MenuItem>
        <p onClick={handleLogout}>Cerrar sesión</p>
      </MenuItem>
    </div>
  );
}


