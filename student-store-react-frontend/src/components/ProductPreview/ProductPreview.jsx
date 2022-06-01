import "./ProductPreview.css";
import { formatPrice } from "../../utils/formatting";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { useState, useEffect } from "react";
import { getFormattedPrice } from "../../utils/api-utils";
import ProductImage from "../ProductImage";

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

function Billboard({ onPlus, onMinus, onView, numInCart, name, price }) {
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
  function View() {
    return (
      <Box
        sx={{
          border: "2px solid black",
          borderRadius: "0.5em",
          bgcolor: "turquoise",
          color: "red",
        }}
      >
        <IconButton
          size="large"
          aria-label="view details one to cart"
          onClick={onView}
          sx={{ py: "0.125em", px: "0.25em" }}
        >
          <VisibilityIcon sx={{ fill: "black" }} />
        </IconButton>
      </Box>
    );
  }

  const rowOne = (
    <Hstack>
      <Typography variant="h5">{name}</Typography> {View()}
    </Hstack>
  );
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

export default function ProductPreview({
  data,
  onUpdateItemQuant,
  itemQuant,
  onActivate,
}) {
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

  let jsx = (
    <Vstack alignItems="flex-start">
      <Billboard
        price={formattedPrice}
        name={name}
        numInCart={itemQuant}
        onPlus={inc}
        onMinus={dec}
        onView={onActivate}
      />
      <Hstack>
        {ProductImage({ source: image, altText: `Image of product: ${name}` })}
      </Hstack>
    </Vstack>
  );
  return jsx;
}
