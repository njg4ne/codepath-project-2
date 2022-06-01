import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { StrictMode } from "react";
import App from "../../App";
import Shopper from "../Shopper";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function Router() {
  const Themeing = (props) => <ThemeProvider theme={darkTheme} {...props} />;
  // const landingRoute = <Route path="/*" element={<App />}></Route>;
  return (
    <StrictMode>
      <Themeing>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Themeing>
    </StrictMode>
  );
}
