import React from "react";
import {
  Avatar,
  Button,
  Divider,
  Drawer,
  Paper,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import "./Cart.css";

const Cart = () => {
  // const theme = useTheme();
  // const matches = useMediaQuery(theme.breakpoints.down("md"));
  const showCart = useSelector((state) => state.showCart);
  const cart = useSelector((state) => state.cart);

  const cartContent = cart.map((item) => (
    <Box key={item.id}>
      <Box
        display="flex"
        sx={{ pt: 2, pb: 2 }}
        alignItems="start"
        justifyContent={"space-between"}
      >
        <Avatar
          src={item.Photo}
          sx={{ width: 85, height: 85, ml: 2 }}
          variant="square"
        />
        <Box
          display="flex"
          flexDirection={"column"}
          alignItems={"center"}
          sx={{ mr: 2 }}
        >
          <Typography variant="body1" sx={{ pl: 1 }}>
            {item.name}
          </Typography>
          <Typography variant="body1">{item.StartDate}</Typography>
        </Box>
        <Typography variant="body1" justifyContent={"end"} sx={{ pr: 2 }}>
          ${item.Price}
        </Typography>
      </Box>
      <Divider variant="inset" />
    </Box>
  ));

  return (
    <Drawer
      open={showCart}
      // open="true"

      anchor="right"
      PaperProps={{
        sx: {
          width: 500,
          background: "#ffffffe0",
          borderRadius: 0,
        },
      }}
    >
      {/* <h1 className="cart__carrito-title">Carrito</h1> */}
      <Box
        sx={{ p: 2 }}
        display="flex"
        justifyContent={"center"}
        flexDirection="column"
        alignItems="center"
      >
        <Typography variant="h4" color="black">
          Tu Carrito
        </Typography>
      </Box>
      <Paper elevation={0} sx={{ mt: 2, width: "90%", padding: 4 }}>
        {cartContent}
      </Paper>
      <Button
        sx={{ mt: 4, backgroundColor: `var(--color-orange)` , mr:1, ml:1}}
        variant="contained"
      >
        COMPRAR
      </Button>
    </Drawer>
  );
};

export default Cart;
