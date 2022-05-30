import React from "react";
import "./ProductGrid.css";

import { useState, useEffect } from "react";
import { loadProducts } from "../../utils/api-utils";
import ProductPreview from "../ProductPreview/ProductPreview";

export default function ProductGrid() {
  const [products, setProducts] = useState(undefined);

  useEffect(() => {
    loadProducts(setProducts);
  }, []);
  return (
    <div className="ProductGrid">
      {products
        ? products.map((p) => (
            <div className="ProductPreview" id={`prod-${p.id}`} key={p.id}>
              {ProductPreview({ data: p })}
            </div>
          ))
        : null}
    </div>
  );
}
