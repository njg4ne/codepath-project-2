import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import ProductImage from "../ProductImage";
import { formatPrice } from "../../utils/formatting";

export default function ProductViewModal({ activeProduct, setActiveProduct }) {
  const open = Boolean(activeProduct);
  const onClose = () => {
    setActiveProduct(undefined);
  };
  function Content() {
    return (
      <Stack spacing={2}>
        <Stack
          sx={{ display: "flex", flexWrap: "wrap" }}
          direction="row"
          spacing={2}
        >
          <Typography variant="h5">{activeProduct.name}</Typography>
          <Typography variant="h5" color="lightgreen">
            {formatPrice(activeProduct.price)}
          </Typography>
        </Stack>

        <Stack direction="row">
          <ProductImage source={activeProduct.image}></ProductImage>
        </Stack>
        <Typography variant="p">{activeProduct.description}</Typography>
        <Link href={activeProduct.source}>Learn more</Link>
      </Stack>
    );
  }
  return (
    <BasicModal onClose={onClose} open={open}>
      {activeProduct ? <Content /> : null}
    </BasicModal>
  );
}

function BasicModal({ children, ...rest }) {
  const modalCanvasStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "min(60%, max-content)",
    height: "min(60%, max-content)",
    overflow: "scroll",
    p: 4,
  };

  return (
    <Modal
      {...rest}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Paper sx={modalCanvasStyle} children={children}></Paper>
    </Modal>
  );
}
