const router = require("express").Router();
const transactionController = require("../controller/transaction");
const authMiddleware = require("../middleware/auth");

router.post(
  "/",
  authMiddleware.validateUserToken,
  transactionController.handleAddTransaction
);
router.get("/events/:id", transactionController.getTransactionByEvent);
router.get("/users/:id", transactionController.getTransactionByUser);

module.exports = router;
