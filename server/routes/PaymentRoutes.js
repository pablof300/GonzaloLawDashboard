// const intuitClient = require("../client/quickbooks");
const express = require("express");
const router = express.Router();
const paymentsController = require("../controllers/paymentsController");

router.get("/", paymentsController.get);
router.get("/callback", paymentsController.callback);
// router.delete("/", fileAwsController.delete_s3);

module.exports = router;
