// const intuitClient = require("../client/quickbooks");
const express = require("express");
const router = express.Router();
const paymentsController = require("../controllers/paymentsController");

router.get("/oauth", paymentsController.getOAuthURL);
router.get("/invoices", paymentsController.getInvoices);
router.post("/invoice", paymentsController.createInvoice);
router.get("/invoice/pdf", paymentsController.getInvoicePdf);
router.get("/callback", paymentsController.callback);
router.get("/status", paymentsController.isPaymentOnline);

module.exports = router;
