import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Stack } from "@mui/material";
import { useEffect } from "react";
function LandingToolbar({ onToggleDrawer }) {
  return (
    <Toolbar>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="open shopping cart"
        sx={{ m: 2 }}
        onClick={onToggleDrawer}
      >
        <ShoppingCartIcon />
      </IconButton>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Student Store
      </Typography>
      <Link to="/orders" style={{ color: "white" }}>
        <Typography variant="h5">Orders</Typography>
      </Link>
    </Toolbar>
  );
}

function OrdersToolbar() {
  return (
    <Toolbar sx={{ flexWrap: "wrap" }}>
      <Stack direction="row" sx={{ flexGrow: 1, m: 1.5 }} alignItems="center">
        <ReceiptIcon sx={{ m: 2 }} />
        <Typography variant="h6" component="div">
          Order Records
        </Typography>
      </Stack>
      <Link to="/" style={{ color: "white", margin: "0.5em" }}>
        <Typography variant="h5">Store</Typography>
      </Link>
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
