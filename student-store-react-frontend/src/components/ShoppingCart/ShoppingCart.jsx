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
import TextField from "@mui/material/TextField";
import { useEffect, useState, SyntheticEvent } from "react";
import { getProductDetails, getTaxRate } from "../../utils/api-utils";
import { formatPrice } from "../../utils/formatting";
import { placeOrder } from "../../utils/order-service";

function PlaceOrderButton(props) {
  return (
    <Stack>
      <Button variant="contained" {...props}>
        Place Order
      </Button>
    </Stack>
  );
}

function OrderingSnackbar({
  cart,
  products,
  userInfo,
  setSnackMsg,
  snackMsg,
  ...rest
}) {
  /**
   * Converts a manifest keyed by id to be keyed by name
   * @param {object} manifest
   * @param {Array} productLibrary
   */

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackMsg(undefined);
  };
  const action = (
    <Paper sx={{ bgcolor: "green" }}>
      <Typography my={0.5} mx={2} variant="h6">
        {snackMsg}
      </Typography>
    </Paper>
  );
  return (
    <Snackbar
      open={Boolean(snackMsg)}
      autoHideDuration={5000}
      onClose={handleClose}
      // action={action}
    >
      {action}
    </Snackbar>
  );
}

function CartItem({ details }) {
  const { name, id, price, quantity } = details;
  const [cost, setCost] = useState(0);

  useEffect(() => {
    setCost(price * quantity);
  }, [price, quantity]);
  return (
    <TableRow>
      <TableCell>{name}</TableCell>
      <TableCell>{quantity}</TableCell>
      <TableCell>{formatPrice(price)}</TableCell>
      <TableCell>{formatPrice(cost)}</TableCell>
    </TableRow>
  );
}

function FormRow({
  userInfo,
  setUserInfo,
  children,
  setFormValid,
  snackMsg,
  setSnackMsg,
  cart,
  products,
}) {
  const [nameError, setNameError] = useState(undefined);
  const [emailError, setEmailError] = useState(undefined);

  function modify(e, field) {
    let changed = { ...userInfo };
    changed[field] = e.target.value;
    setUserInfo(changed);
  }
  function badEmail(value) {
    if (!value || value.trim() == "") {
      return true;
    }
    const at = value.indexOf("@");
    if (at < 1) {
      return true;
    }
    const dot = value.slice(at + 1).indexOf(".");
    if (dot < 1) {
      return true;
    }
    if (value.slice(at + dot + 2).length < 2) {
      return true;
    }
    return false;
  }
  function badName(value) {
    if (!value || value.trim() == "") {
      return true;
    }
    return !(value.trim().length > 2 && value.trim().indexOf(" ") > 0);
  }
  function onSubmit(e) {
    e.preventDefault();
    const errors = [badName(userInfo.name), badEmail(userInfo.email)];
    setEmailError(errors[1]);
    setNameError(errors[0]);
    const preventOrder = errors.reduce((l, r) => l || Boolean(r), false);
    placeOrder(cart, products, userInfo, preventOrder, setSnackMsg, snackMsg);
  }
  return (
    <TableRow>
      <TableCell colSpan={4}>
        <Stack
          spacing={2}
          component="form"
          autoComplete="off"
          onSubmit={onSubmit}
        >
          <TextField
            error={nameError}
            placeholder="John Doe"
            label="Full Name"
            inputProps={{ "aria-label": "input full name" }}
            value={userInfo.name}
            onChange={(e) => modify(e, "name")}
          />
          <TextField
            error={emailError}
            placeholder="email@example.com"
            label="Email Address"
            inputProps={{ "aria-label": "input a valid email address" }}
            onChange={(e) => modify(e, "email")}
            value={userInfo.email}
          />
          {children}
        </Stack>
      </TableCell>
    </TableRow>
  );
}

export function ShoppingCart({ cart, products, taxRate, userInfoState }) {
  const [cartDetails, setCartDetails] = useState([]);
  const [formValid, setFormValid] = useState(false);
  const [snackMsg, setSnackMsg] = useState(undefined);

  const [math, setMath] = useState({
    subtotal: 0,
    taxes: 0,
    total: 0,
  });

  const [userInfo, setUserInfo] = userInfoState;
  useEffect(() => {
    const ids = Object.keys(cart);
    getProductDetails(ids, setCartDetails);
  }, [cart]);

  useEffect(() => {
    const subtotal = cartDetails.reduce((l, r) => {
      const cost = cart[r.id] * r.price;
      return l + cost;
    }, 0);
    const taxes = taxRate * subtotal;
    const total = taxes + subtotal;
    let newMath = { subtotal, taxes, total };
    newMath = Object.keys(newMath).reduce((obj, k) => {
      obj[k] = formatPrice(newMath[k]);
      return obj;
    }, {});
    setMath(newMath);
  }, [cartDetails, taxRate]);

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
              <TableCell>{math.subtotal}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>Taxes and Fees</TableCell>
              <TableCell>{math.taxes}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell>{math.total}</TableCell>
            </TableRow>
            <FormRow
              setUserInfo={setUserInfo}
              userInfo={userInfo}
              setFormValid={setFormValid}
              snackMsg={snackMsg}
              setSnackMsg={setSnackMsg}
              cart={cart}
              products={products}
            >
              <PlaceOrderButton type="submit" />
            </FormRow>
            <TableRow>
              <TableCell colSpan={4}></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <OrderingSnackbar setSnackMsg={setSnackMsg} snackMsg={snackMsg} />
    </Stack>
  );
}
