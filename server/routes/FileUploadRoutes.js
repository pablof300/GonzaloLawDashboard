const fileUploadController = require("../controllers/uploadController");
const express = require("express");
const router = express.Router();




router.post("/", fileUploadController.sign_s3);


module.exports = router;
