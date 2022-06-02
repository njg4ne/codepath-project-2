const express = require("express");
const Orders = require("../models/orders");
const router = express.Router();

router.get("/delete/:orderId", async (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    const order = await Orders.fetchOrderById(orderId);
    //console.log(req);
    res.status(200).json({ delete: "received" });
  } catch (err) {
    next(err);
  }
});

router.get("/q/name=:name&email=:email", async (req, res, next) => {
  try {
    // const orderId = req.params.orderId;
    const orders = await Orders.fetchOrderBy(req.params.name, req.params.email);
    //console.log(req);
    res.status(200).json({ orders });
  } catch (err) {
    next(err);
  }
});

router.get("/:orderId", async (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    const order = await Orders.fetchOrderById(orderId);
    res.status(200).json({ order });
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const orders = await Orders.listOrders();
    res.status(200).json({ orders });
  } catch (err) {
    next(err);
  }
});

// router.get("/format/:raw", async (req, res, next) => {
//   try {
//     const raw = req.params.raw;
//     const formatted = Store.makeFormattedPrice(raw);
//     res.status(200).json({ formatted });
//   } catch (err) {
//     next(err);
//   }
// });

// router.post("/", async (req, res, next) => {
//   try {
//     const cart = req.body.cart;
//     const userInfo = req.body.userInfo;
//     const purchase = await Store.purchaseProducts(cart, userInfo);
//     res.status(200).json({ purchase, cart });
//   } catch (err) {
//     next(err);
//   }
// });

module.exports = router;
