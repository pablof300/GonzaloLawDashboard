const fileAwsController = require("../controllers/fileAwsController");
const express = require("express");
const router = express.Router();

router.post("/", fileAwsController.sign_s3);
router.delete("/", fileAwsController.delete_s3);

module.exports = router;
