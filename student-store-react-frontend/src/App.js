import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import ProductGrid from "./components/ProductGrid";
import Drawer from "@mui/material/Drawer";
import { Button, Container, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { getTaxRate } from "./utils/api-utils";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ShoppingCart } from "./components/ShoppingCart/ShoppingCart";
import Modal from "@mui/material/Modal";
import ProductViewModal from "./components/ProductViewModal";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const [taxRate, setTaxRate] = useState(0);
  const [drawer, setDrawer] = useState(false);
  const closeDrawer = () => setDrawer(false);
  const [cart, setCart] = useState({});
  const [products, setProducts] = useState(undefined);
  const [activeProduct, setActiveProduct] = useState(undefined);

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
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <Navbar onCartToggle={() => setDrawer(!drawer)} />
        <ProductGrid
          onCartChange={updateCart}
          cart={cart}
          products={products}
          setProducts={setProducts}
          setActiveProduct={setActiveProduct}
        />
        <Drawer open={drawer} onClose={() => setDrawer(false)} anchor="left">
          <ShoppingCart cart={cart} products={products} taxRate={taxRate} />
        </Drawer>
        <ProductViewModal
          activeProduct={activeProduct}
          setActiveProduct={setActiveProduct}
        />
      </ThemeProvider>
    </div>
  );
}

export default App;
