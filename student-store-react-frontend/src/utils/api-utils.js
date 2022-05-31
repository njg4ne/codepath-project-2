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

export function getProductDetails(ids, setter) {
  const promises = ids.map((id) =>
    axios
      .get(`${API_URL}store/prod/${id}`)
      .then((resp) => resp.data.product)
      .then(({ name, price }) => {
        return { name, price, id };
      })
      // .then((p) => {
      //   return Promise.all([axios.get(`${API_URL}store/format/${p.price}`), p]);
      // })
      // .then(([fPrice, prod]) => {
      //   prod["priceStr"] = fPrice.data.formatted;
      //   return prod;
      // })
      .catch((err) => console.log(err))
  );
  Promise.all(promises).then((details) => {
    setter(details);
  });
}

export function getFormattedPrice(price, setter) {
  axios
    .get(`${API_URL}store/format/${price}`)
    .then((resp) => resp.data.formatted)
    .then((str) => {
      setter(str);
    })
    .catch((err) => console.log(err));
}

export function getTaxRate(setter) {
  axios
    .get(`${API_URL}store/taxrate`)
    .then((resp) => resp.data.rate)
    .then((rate) => {
      setter(rate);
    })
    .catch((err) => console.log(err));
}
