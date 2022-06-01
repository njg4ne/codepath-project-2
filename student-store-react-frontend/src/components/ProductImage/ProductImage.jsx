const PLACEHOLDER_URL =
  "https://www.aaronfaber.com/wp-content/uploads/2017/03/product-placeholder-wp.jpg";

export default function ProductImage({ source, altText }) {
  const src = source ? source : PLACEHOLDER_URL;
  const fallback = (e) => (e.target.src = PLACEHOLDER_URL);
  let jsx = <img alt={altText} src={source} onError={fallback} />;
  return jsx;
}
