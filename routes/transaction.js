const router = require("express").Router();
const transactionController = require("../controller/transaction");
const authMiddleware = require("../middleware/auth");

router.post(
  "/",
  authMiddleware.validateUserToken,
  transactionController.handleAddTransaction
);

module.exports = router;
