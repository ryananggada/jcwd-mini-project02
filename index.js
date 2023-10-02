const express = require("express");

const app = express();
app.use(express.json());

const db = require("./models");
// db.sequelize.sync({ alter: true });

const authRouter = require("./routes/auth");
const eventRouter = require("./routes/event");
const transactionRouter = require("./routes/transaction");
const couponRouter = require("./routes/coupon");

app.use("/auth", authRouter);
app.use("/event", eventRouter);
app.use("/transaction", transactionRouter);
app.use("/coupon", couponRouter);

app.use((req, res) => {
  console.error(`Not found: ${req.path}`);
  res.status(404).json({
    ok: false,
    message: "Route not found",
  });
});

app.use((err, req, res, next) => {
  console.error(`FATAL ERROR: ${req.path}`);
  console.error(err);

  res.status(500).json({
    ok: false,
    message: "FATAL ERROR",
    error: String(err),
  });
});

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`App listening to port ${PORT}`);
});
