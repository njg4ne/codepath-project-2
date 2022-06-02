const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { NotFoundError } = require("./utils/errors");
const storeRouter = require("./routes/store");
const ordersRouter = require("./routes/orders");

const app = express();

app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());
app.use("/store", storeRouter);
app.use("/orders", ordersRouter);

/* Handle all 404 errors that weren't matched by a route */
app.use((req, res, next) => {
  return next(new NotFoundError());
});

/* Generic error handler - anything that is unhandled will be handled here */
app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message;

  return res.status(status).json({
    error: { message, status },
  });
});

const port = 3001;

app.listen(port, () => {
  console.log(`🚀 Server listening on port ` + port);
});
