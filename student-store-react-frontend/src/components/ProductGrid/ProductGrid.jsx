import React from "react";
import "./ProductGrid.css";

import { useState, useEffect } from "react";
import { loadProducts } from "../../utils/api-utils";
import ProductPreview from "../ProductPreview/ProductPreview";
import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";

export default function ProductGrid({ onCartChange, cart }) {
  const [products, setProducts] = useState(undefined);
  useEffect(() => {
    loadProducts(setProducts);
  }, []);
  return (
    <Paper elevation={0} className="ProductGrid">
      {products
        ? products.map((p) => {
            const updateItemQuant = (quantityChange) => {
              onCartChange(p.id, quantityChange);
            };
            const cartQuantity = cart[p.id] ? cart[p.id] : 0;
            return (
              <Card className="PreviewCanvas" elevation={5} key={p.id}>
                <ProductPreview
                  data={p}
                  onUpdateItemQuant={updateItemQuant}
                  itemQuant={cartQuantity}
                />
              </Card>
            );
          })
        : null}
    </Paper>
  );
}
