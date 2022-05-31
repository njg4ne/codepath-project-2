import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import ProductGrid from "./components/ProductGrid";
import Drawer from "@mui/material/Drawer";
import { Button, Container, Typography } from "@mui/material";
import { useState } from "react";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ShoppingCart } from "./components/ShoppingCart/ShoppingCart";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import Stack from "@mui/material/Stack";
// import { Box } from "@mui/system";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const [drawer, setDrawer] = useState(false);
  const closeDrawer = () => setDrawer(false);
  const [cart, setCart] = useState({});
  const updateCart = (itemID, quantityChange) => {
    let newCart = { ...cart };
    if (cart[itemID]) {
      newCart[itemID] += quantityChange;
      if (newCart[itemID] === 0) {
        delete newCart[itemID];
      }
    } else if (quantityChange < 0) {
      throw "Cannot remove an item that is not in the cart!";
    } else {
      newCart[itemID] = quantityChange;
    }
    setCart(newCart);
  };

  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        {/* <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          bgcolor: "yellow",
        }}
      >
        <Navbar onCartToggle={() => setDrawer(!drawer)} />
        <Box sx={{ bgcolor: "red", width: "100%", flex: "1" }} />
      </Box> */}
        {/* <Paper sx={{ w: "100vw", bgcolor: "red", h: "100vh" }}></Paper> */}
        <Navbar onCartToggle={() => setDrawer(!drawer)} />
        <ProductGrid onCartChange={updateCart} cart={cart} />
        <Drawer open={drawer} onClose={() => setDrawer(false)} anchor="left">
          <ShoppingCart cart={cart} />
        </Drawer>

        {/* {Drawer({ anchor: "left", open: { drawer }, onClose: { closeDrawer } })} */}
        {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      </ThemeProvider>
    </div>
  );
}

export default App;
