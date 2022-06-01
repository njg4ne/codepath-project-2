import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { useEffect } from "react";
function LandingToolbar({ onCartToggle }) {
  return (
    <Toolbar>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="open shopping cart"
        sx={{ mr: 2 }}
        onClick={onCartToggle}
      >
        <ShoppingCartIcon />
      </IconButton>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Student Store
      </Typography>
    </Toolbar>
  );
}

function OrdersToolbar({ onCartToggle }) {
  return (
    <Toolbar>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="open shopping cart"
        sx={{ mr: 2 }}
        // onClick={onCartToggle}
      >
        <ReceiptIcon />
      </IconButton>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Student Store Order Records
      </Typography>
    </Toolbar>
  );
}

export default function Navbar(props) {
  useEffect(() => {
    console.log(window.location);
  }, []);
  const landingRoute = (
    <Route path="/" element={<LandingToolbar {...props} />}></Route>
  );
  const ordersRoute = (
    <Route path="orders" element={<OrdersToolbar {...props} />}></Route>
  );
  return (
    <Box sx={{ flexGrow: 0 }}>
      <AppBar position="static">
        <Routes>
          {landingRoute}
          {ordersRoute}
        </Routes>
      </AppBar>
    </Box>
  );
}
