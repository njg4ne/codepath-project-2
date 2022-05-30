import axios from "axios";

import { API_URL } from "./constants";

export function loadProducts(setter) {
  axios
    .get(`${API_URL}store`)
    .then((resp) => resp.data.products)
    .then((prods) => {
      setter(prods);
    })
    .catch((err) => console.log(err));
}
