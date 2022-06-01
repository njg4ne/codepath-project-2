import Navbar from "./Navbar";
import ProductGrid from "./ProductGrid";
import Drawer from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import { useState, useEffect } from "react";
import { getTaxRate } from "../utils/api-utils";
import ShoppingCart from "./ShoppingCart";
import ProductViewModal from "./ProductViewModal";

export default function Shopper() {
  const [taxRate, setTaxRate] = useState(0);
  const [drawer, setDrawer] = useState(false);
  const [cart, setCart] = useState({});
  const [products, setProducts] = useState(undefined);
  const [activeProduct, setActiveProduct] = useState(undefined);
  const userInfoState = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    getTaxRate(setTaxRate);
  }, []);

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
    <Stack sx={{ minHeight: "100vh", bgcolor: "black" }}>
      <Navbar onCartToggle={() => setDrawer(!drawer)} />
      <ProductGrid
        onCartChange={updateCart}
        cart={cart}
        products={products}
        setProducts={setProducts}
        setActiveProduct={setActiveProduct}
      />
      <Drawer open={drawer} onClose={() => setDrawer(false)} anchor="left">
        <ShoppingCart
          cart={cart}
          products={products}
          taxRate={taxRate}
          userInfoState={userInfoState}
        />
      </Drawer>
      <ProductViewModal
        activeProduct={activeProduct}
        setActiveProduct={setActiveProduct}
      />
    </Stack>
  );
}
