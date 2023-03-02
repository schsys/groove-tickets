import * as React from "react";
import { DashboardMenuItem, MenuItemLink } from "react-admin";
import { useHistory } from "react-router-dom";
import ReviewsIcon from '@mui/icons-material/Reviews';
import PeopleIcon from "@mui/icons-material/People";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GroupsIcon from '@mui/icons-material/Groups';
import CategoryIcon from '@mui/icons-material/Category';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import WifiCalling3Icon from '@mui/icons-material/WifiCalling3';
import ReceiptIcon from '@mui/icons-material/Receipt';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import Swal from "sweetalert2";
import { UserAuth } from "../../context/AuthContext";

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
      <MenuItemLink to="/orders" primaryText="Order" leftIcon={<ReceiptIcon />} />
      <MenuItemLink
        to="/reviews"
        primaryText="Review"
        leftIcon={<ReviewsIcon />}
      />
      <MenuItemLink to="/mailgen" primaryText="Notification" leftIcon={<NotificationsIcon />} />
      <MenuItemLink to="" onClick={() => history.push("/")} primaryText="Back to site" leftIcon={<HomeIcon />} />
      <MenuItemLink to="" onClick={handleLogout} primaryText="Logout" leftIcon={<LogoutIcon />} />
    </div>
  );
}
