import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import ProductGrid from "./components/ProductGrid";
import Drawer from "@mui/material/Drawer";
import { Button, Container, Typography } from "@mui/material";
import { useState } from "react";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/system";

const testItems = [
  { name: "Cheetos", quantity: 2, unitPrice: 1.5, cost: 3 },
  { name: "Cheetos", quantity: 2, unitPrice: 1.5, cost: 3 },
  { name: "Cheetos", quantity: 2, unitPrice: 1.5, cost: 3 },
];

function ShoppingCart(props) {
  return (
    <Stack>
      <Typography variant="h4" align="center" sx={{ p: ".25em" }}>
        Shopping Cart
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 200 }} aria-label="shopping cart table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Unit Price</TableCell>
              <TableCell>Cost</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {testItems.map((item) => (
              <TableRow
                key={item.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.unitPrice}</TableCell>
                <TableCell>{item.cost}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TableContainer component={Paper} sx={{ mt: "1em" }}>
        <Table sx={{ minWidth: 200 }} aria-label="shopping cart table">
          <TableBody>
            <TableRow>
              <TableCell colSpan={3}>Subtotal</TableCell>
              <TableCell>2</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>Taxes and Fees</TableCell>
              <TableCell>2</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell>2</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const [drawer, setDrawer] = useState(false);
  const closeDrawer = () => setDrawer(false);
  return (
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
      {ProductGrid()}
      <Drawer open={drawer} onClose={() => setDrawer(false)} anchor="left">
        {ShoppingCart()}
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
  );
}

export default App;
