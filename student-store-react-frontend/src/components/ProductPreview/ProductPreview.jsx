import React from "react";
import "./ProductPreview.css";
import { formatPrice } from "../../utils/formatting";

const PLACEHOLDER_URL =
  "https://www.aaronfaber.com/wp-content/uploads/2017/03/product-placeholder-wp.jpg";

export default function ProductPreview({ data }) {
  const { image, price, description, name } = data;
  function PreviewImage({ source, altText }) {
    const src = source ? source : PLACEHOLDER_URL;
    const fallback = (e) => (e.target.src = PLACEHOLDER_URL);
    let jsx = <img alt={altText} src={source} onError={fallback} />;
    return jsx;
  }
  let jsx = (
    <div className="flex-column">
      <span className="flex-row">
        <h4>{name}</h4>
        <p>{formatPrice(price)}</p>
      </span>
      {PreviewImage({ source: image })}
    </div>
  );
  return jsx;
}
