import React from "react";
import "./ProductGrid.css";

import { useState, useEffect } from "react";
import { loadProducts } from "../../data-utils/api-utils";

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
              {p.name}
            </div>
          ))
        : null}
    </div>
  );
}
