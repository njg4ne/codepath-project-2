import { Stack, Typography } from "@mui/material";
import Receipt from "../components/Receipt";
import { sendOrder } from "./api-utils";

export function placeOrder(
  cart,
  products,
  userInfo,
  preventOrder,
  setSnackMsg,
  snackMsg
) {
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
  setSnackMsg(undefined);
  if (preventOrder) {
    setSnackMsg(`Order failed- missing user information`);
    return;
  }
  if (Object.keys(cart).length === 0) {
    setSnackMsg(`Order failed- no items in cart`);
    return;
  }
  let cartByName;
  try {
    cartByName = productsByName(cart, products);
  } catch (error) {
    console.log(`Error: ${error}`);
    setSnackMsg(`Order failed- ${error}`);
    return;
  }
  const onSuccess = (msg) => {
    if (snackMsg) {
      setSnackMsg(undefined);
    }
    if (!msg || !msg.receipt) {
      setSnackMsg(`Order processing failed- try again`);
    }
    const receiptView = (lines) => (
      <Stack spacing={2}>
        <Typography variant="h5">Order Succeeded!</Typography>
        {Receipt(lines)}
      </Stack>
    );

    // console.log(msg);
    setSnackMsg(receiptView(msg.receipt.lines));
  };
  setSnackMsg(`Order submitted- response pending`);
  sendOrder(cartByName, userInfo, onSuccess);
}
