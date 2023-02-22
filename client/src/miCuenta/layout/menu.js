import * as React from "react";
import { DashboardMenuItem, MenuItemLink } from "react-admin";
import BookIcon from "@mui/icons-material/Book";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import PeopleIcon from "@mui/icons-material/People";
import LabelIcon from "@mui/icons-material/Label";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GroupsIcon from '@mui/icons-material/Groups';
import CategoryIcon from '@mui/icons-material/Category';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import WifiCalling3Icon from '@mui/icons-material/WifiCalling3';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

export const Menu = () => (
  <div>
    <DashboardMenuItem />
    <MenuItemLink
      to="/customers"
      primaryText="Customer"
      leftIcon={<LabelIcon />}
    />
    <MenuItemLink
      to="/user"
      primaryText="User"
      leftIcon={<PeopleIcon />}
    />
    <MenuItemLink to="/orders" primaryText="Order" leftIcon={<BookmarkBorderIcon />} />
    <MenuItemLink
      to="/reviews"
      primaryText="Review"
      leftIcon={<BookIcon />}
    />
  </div>
);
