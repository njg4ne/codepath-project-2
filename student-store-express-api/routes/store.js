const express = require("express");
const Store = require("../models/store");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const products = await Store.listProducts();
    res.status(200).json({ products });
  } catch (err) {
    next(err);
  }
});

router.get("/prod/:productId", async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const product = await Store.fetchProductById(productId);
    res.status(200).json({ product });
  } catch (err) {
    next(err);
  }
});
router.get("/format/:raw", async (req, res, next) => {
  try {
    const raw = req.params.raw;
    const formatted = Store.makeFormattedPrice(raw);
    res.status(200).json({ formatted });
  } catch (err) {
    next(err);
  }
});

router.get("/taxrate", async (req, res, next) => {
  try {
    res.status(200).json({ rate: Store.tax });
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const cart = req.body.cart;
    const userInfo = req.body.userInfo;
    const purchase = await Store.purchaseProducts(cart, userInfo);
    res.status(200).json({ purchase, cart });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
