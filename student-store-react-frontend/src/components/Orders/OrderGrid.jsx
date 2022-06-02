import React from "react";

import { useState, useEffect } from "react";
import { getMyOrders, loadOrders, loadProducts } from "../../utils/api-utils";
import ProductPreview from "../ProductPreview/ProductPreview";
import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";
import Receipt from "../Receipt";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import UserForm from "../UserForm";
import { Alert } from "../ShoppingCart/ShoppingCart";
import { Button } from "@mui/material";

export function Orders({ userInfo, setUserInfo, setOrders }) {
  const [nameError, setNameError] = useState(undefined);
  const [emailError, setEmailError] = useState(undefined);
  const [snackMsg, setSnackMsg] = useState(undefined);
  const onSubmit = (e, errors) => {
    e.preventDefault();
    getMyOrders(userInfo.name, userInfo.email, setOrders, setSnackMsg);
  };
  const childProps = { userInfo, setUserInfo, onSubmit };
  return (
    <Paper elevation={0} sx={{ flexGrow: 1 }}>
      <Stack alignItems={"center"}>
        <Card
          sx={{
            height: "max-content",
            m: 3,
            p: 3,
            width: "max(240px, 50%)",
          }}
        >
          <UserForm {...childProps}>
            <Button variant="contained" type="submit">
              Look Up Orders
            </Button>
          </UserForm>
        </Card>
      </Stack>
      <Alert
        sx={{ bgcolor: "red" }}
        setSnackMsg={setSnackMsg}
        snackMsg={snackMsg}
      />
    </Paper>
  );
}

export default function OrderGrid({
  onCartChange,
  cart,
  products,
  setProducts,
  setActiveProduct,
  userInfo,
  setUserInfo,
}) {
  const [orders, setOrders] = useState(undefined);
  // useEffect(() => {
  //   loadOrders(setOrders);
  // }, []);
  const cardSX = {
    width: "max-content",
    maxWidth: "90%",
    height: "max-content",
    bgcolor: "darkgreen",
    p: 1.25,
  };
  const fullHeight = {
    flex: 1,
  };
  return !orders ? (
    <Orders
      userInfo={userInfo}
      setUserInfo={setUserInfo}
      setOrders={setOrders}
    ></Orders>
  ) : (
    <Paper elevation={0} sx={fullHeight}>
      <Stack
        spacing={2}
        sx={fullHeight}
        m={2}
        justifyContent="flex-start"
        alignItems="center"
      >
        {orders.map((o, i) => {
          return (
            <Card elevation={5} key={i} sx={cardSX}>
              {Receipt(o.receipt.lines)}
            </Card>
          );
        })}
      </Stack>
    </Paper>
  );
}
