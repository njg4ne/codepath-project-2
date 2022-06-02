import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { StrictMode } from "react";
import App from "../../App";
import Shopper from "../Shopper";
import Stack from "@mui/material/Stack";
import Navbar from "../Navbar";
import { useState } from "react";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function Viewport(props) {
  const sx = { minHeight: "100vh", bgcolor: "black", display: "flex" };
  return <Stack sx={sx} {...props} />;
}

export default function Router() {
  const Themeing = (props) => <ThemeProvider theme={darkTheme} {...props} />;

  return (
    <StrictMode>
      <Themeing>
        <BrowserRouter>
          <Viewport>
            <Shopper />
          </Viewport>
        </BrowserRouter>
      </Themeing>
    </StrictMode>
  );
}
