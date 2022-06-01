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
  getProductDetails,
  getTaxRate,
  sendOrder,
} from "../../utils/api-utils";
import { formatPrice } from "../../utils/formatting";
const testItems = [
  { name: "Cheetos", quantity: 2, unitPrice: 1.5, cost: 3 },
  { name: "Cheetos", quantity: 2, unitPrice: 1.5, cost: 3 },
  { name: "Cheetos", quantity: 2, unitPrice: 1.5, cost: 3 },
];

function PlaceOrderButton({ cart, products, userInfo }) {
  const [open, setOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("Order Not Placed");
  /**
   * Converts a manifest keyed by id to be keyed by name
   * @param {object} manifest
   * @param {Array} productLibrary
   */
  function productsByName(manifest, productLibrary) {
    let toRet = { ...manifest };
    toRet = Object.keys(toRet).reduce((obj, currId, idx) => {
      const fullProducts = productLibrary.filter((p) => currId == p.id);
      let name;
      if (!fullProducts || fullProducts.length !== 1) {
        throw `Unexpectedly found less/more than one product with id: ${currId}`;
      } else {
        const prod = fullProducts[0];
        const quantity = manifest[currId];
        obj[prod.name] = quantity;
      }
      return obj;
    }, {});
    return toRet;
  }
  const placeOrder = () => {
    setSnackMsg(`Order failed- Unknown Error`);
    if (Object.keys(cart).length === 0) {
      setSnackMsg(`Order failed- no items in cart`);
      setOpen(true);
      return;
    }
    let cartByName;
    try {
      cartByName = productsByName(cart, products);
    } catch (error) {
      console.log(`Error: ${error}`);
      setSnackMsg(`Order failed- ${error}`);
      setOpen(true);
      return;
    }
    const onSuccess = (msg) => {
      if (open) {
        setOpen(false);
      }
      if (!msg || !msg.receipt) {
        setSnackMsg(`Order processing failed- try again`);
      }
      const receiptView = (lines) => (
        <Stack spacing={2}>
          <Typography variant="h5">Order Succeeded!</Typography>
          {lines.map((line, idx) => {
            return (
              <Typography variant="h6" key={idx}>
                {line}
              </Typography>
            );
          })}
        </Stack>
      );

      // console.log(msg);
      setSnackMsg(receiptView(msg.receipt.lines));
      setOpen(true);
    };
    setSnackMsg(`Order submitted- response pending`);
    sendOrder(cartByName, userInfo, onSuccess);
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const action = (
    <Paper sx={{ bgcolor: "green" }}>
      <Typography my={0.5} mx={2} variant="h6">
        {snackMsg}
      </Typography>
    </Paper>
  );
  return (
    <Stack>
      <Button variant="contained" onClick={placeOrder}>
        Place Order
      </Button>
      <Snackbar
        open={open}
        autoHideDuration={5000}
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

export function ShoppingCart({ cart, products, taxRate }) {
  const [cartDetails, setCartDetails] = useState([]);

  const [math, setMath] = useState({
    subtotal: 0,
    taxes: 0,
    total: 0,
  });

  const [userInfo, setUserInfo] = useState({
    name: "John Doe",
    email: "j.doe@gmail.com",
  });

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
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell colSpan={3}>{userInfo.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell colSpan={3}>{userInfo.email}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={4}>
                <PlaceOrderButton
                  cart={cart}
                  products={products}
                  userInfo={userInfo}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}
