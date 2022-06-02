const { BadRequestError, NotFoundError } = require("../utils/errors");
const { storage } = require("../data/storage");

String.prototype.urlFriendly = function () {
  return this.replace(/ /g, "+");
};

// const formatter = new Intl.NumberFormat("en-US", {
//   currency: "USD",
//   minimumFractionDigits: 2,
//   maximumFractionDigits: 2,
// });

// const formatPrice = (amount) => {
//   return `$${formatter.format(amount)}`;
// };

class Orders {
  static async listOrders() {
    return storage.get("purchases").value();
  }

  static async fetchOrderById(id) {
    if (id < 1) {
      throw new NotFoundError("id must be greater than or equal to 1.");
    }
    const order = storage
      .get("purchases")
      .value()
      .at(id - 1);
    if (order) return order;

    throw new NotFoundError("No order found with that id.");
  }

  static async fetchOrderBy(qName, qEmail) {
    console.log(qName, qEmail);
    if (qName && qEmail) {
      const orders = storage
        .get("purchases")
        .value()
        .filter(({ name, email }) => {
          return name.urlFriendly() === qName && email.urlFriendly() === qEmail;
        });
      if (orders && orders.length > 0) {
        return orders;
      }
    }
    throw new NotFoundError("No orders on record match your name and email.");
  }

  // static async fetchOrderByEmail(email) {
  //   const ordersRouter = storage
  //     .get("purchases")
  //     .find({ id: Number(productId) })
  //     .value();

  //   if (product) return product;

  //   throw new NotFoundError("No product found with that id.");
  // }
}

module.exports = Orders;
