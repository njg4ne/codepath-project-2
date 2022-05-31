import "./ProductPreview.css";
import { formatPrice } from "../../utils/formatting";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { useState, useEffect } from "react";
import { getFormattedPrice } from "../../utils/api-utils";

const PLACEHOLDER_URL =
  "https://www.aaronfaber.com/wp-content/uploads/2017/03/product-placeholder-wp.jpg";

function Hstack(props) {
  return (
    <Stack
      spacing={2}
      {...props}
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
    />
  );
}
function Vstack({ children }) {
  return <Stack direction="column" spacing={1} children={children} />;
}

function Billboard({ onPlus, onMinus, numInCart, name, price }) {
  function Plus() {
    return (
      <IconButton size="large" aria-label="add one to cart" onClick={onPlus}>
        <AddCircleOutlineIcon />
      </IconButton>
    );
  }
  function Minus() {
    return numInCart > 0 ? (
      <IconButton
        size="large"
        aria-label="remove one from cart"
        onClick={onMinus}
      >
        <RemoveCircleOutlineIcon />
      </IconButton>
    ) : null;
  }

  const rowOne = <Typography variant="h5">{name}</Typography>;
  const buttons = (
    <Hstack spacing={0}>
      {Plus()} {Minus()}
    </Hstack>
  );
  const rowTwo = (
    <Hstack>
      <Typography
        variant="h6"
        sx={{ px: "0.5em", border: "2px solid white", borderRadius: "5px" }}
      >
        {numInCart}
      </Typography>
      {buttons}
      <Typography variant="h6" color="lightgreen">
        {price}
      </Typography>
    </Hstack>
  );
  return (
    <Vstack>
      {rowOne}
      {rowTwo}
    </Vstack>
  );
}

export default function ProductPreview({ data, onUpdateItemQuant, itemQuant }) {
  const { image, price, description, name } = data;
  const [inCart, setInCart] = useState(0);
  const [formattedPrice, setPrice] = useState(price);
  const inc = () => {
    onUpdateItemQuant(1);
  };
  const dec = () => {
    onUpdateItemQuant(-1);
  };
  useEffect(() => {
    getFormattedPrice(price, setPrice);
  }, []);

  function PreviewImage({ source, altText }) {
    const src = source ? source : PLACEHOLDER_URL;
    const fallback = (e) => (e.target.src = PLACEHOLDER_URL);
    let jsx = <img alt={altText} src={source} onError={fallback} />;
    return jsx;
  }
  let jsx = (
    <Vstack>
      <Billboard
        price={formattedPrice}
        name={name}
        numInCart={itemQuant}
        onPlus={inc}
        onMinus={dec}
      />
      {PreviewImage({ source: image })}
    </Vstack>
  );
  return jsx;
}
