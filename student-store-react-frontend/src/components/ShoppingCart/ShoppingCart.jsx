import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import { useEffect, useState, SyntheticEvent } from "react";
import {
  getFormattedPrice,
  getProductDetails,
  getTaxRate,
} from "../../utils/api-utils";
const testItems = [
  { name: "Cheetos", quantity: 2, unitPrice: 1.5, cost: 3 },
  { name: "Cheetos", quantity: 2, unitPrice: 1.5, cost: 3 },
  { name: "Cheetos", quantity: 2, unitPrice: 1.5, cost: 3 },
];

function PlaceOrderButton({ cart }) {
  const [open, setOpen] = useState(false);
  const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const action = (
    <Paper sx={{ bgcolor: "green" }}>
      <Typography my={0.5} mx={2} variant="h6">
        Order Not Placed!
      </Typography>
    </Paper>
  );
  return (
    <Stack>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Place Order
      </Button>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        // message="Note archived"
        action={action}
      >
        {action}
      </Snackbar>
    </Stack>
  );
}

function CartItem({ details }) {
  const { name, id, price, quantity } = details;
  const [priceStr, setPriceStr] = useState(price);
  const [costStr, setCostStr] = useState("");

  useEffect(() => {
    getFormattedPrice(price, setPriceStr);
    getFormattedPrice(price * quantity, setCostStr);
    console.log();
  }, [price, quantity]);
  return (
    <TableRow>
      <TableCell>{name}</TableCell>
      <TableCell>{quantity}</TableCell>
      <TableCell>{priceStr}</TableCell>
      <TableCell>{costStr}</TableCell>
    </TableRow>
  );
}

export function ShoppingCart({ cart }) {
  const [cartDetails, setCartDetails] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [taxRate, setTaxRate] = useState(0);
  const [taxes, setTaxes] = useState(0);
  const [total, setTotal] = useState(0);
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("j.doe@gmail.com");

  useEffect(() => {
    getTaxRate(setTaxRate);
  }, []);
  useEffect(() => {
    const ids = Object.keys(cart);
    getProductDetails(ids, setCartDetails);
  }, [cart]);
  useEffect(() => {
    const subtotal = cartDetails.reduce((l, r) => {
      const cost = cart[r.id] * r.price;
      return l + cost;
    }, 0);
    setSubtotal(subtotal);
    setTaxes(taxRate * subtotal);
    setTotal(taxRate * subtotal + subtotal);
  }, [cart, cartDetails, taxRate]);
  useEffect(() => {
    if (!subtotal.includes) {
      getFormattedPrice(subtotal, setSubtotal);
    }
  }, [subtotal]);
  useEffect(() => {
    if (!taxes.includes) {
      getFormattedPrice(taxes, setTaxes);
    }
  }, [taxes]);
  useEffect(() => {
    if (!total.includes) {
      getFormattedPrice(total, setTotal);
    }
  }, [total]);

  const quantities = Object.keys(cart).map((e) => cart[e]);

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
            {cartDetails.map((e, idx) => {
              const dets = { ...e, quantity: cart[e.id] };
              return <CartItem details={dets} key={e.id} />;
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <TableContainer component={Paper} sx={{ mt: "1em" }}>
        <Table sx={{ minWidth: 200 }} aria-label="shopping cart table">
          <TableBody>
            <TableRow>
              <TableCell colSpan={3}>Subtotal</TableCell>
              <TableCell>{subtotal}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>Taxes and Fees</TableCell>
              <TableCell>{taxes}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell>{total}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell colSpan={3}>{name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell colSpan={3}>{email}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={4}>
                <PlaceOrderButton cart={cart} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}
