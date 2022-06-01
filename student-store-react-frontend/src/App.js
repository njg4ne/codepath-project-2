import { Routes, Route } from "react-router-dom";
import Router from "./components/Router/Router";
import Shopper from "./components/Shopper";

export default function App() {
  const shopper = <Route path="/*" element={<Shopper />}></Route>;
  return <Routes>{shopper}</Routes>;
}
