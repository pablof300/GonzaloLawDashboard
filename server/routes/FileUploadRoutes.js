const fileUploadController = require("../controllers/uploadController");
const express = require("express");
const router = express.Router();




router.post("/", fileUploadController.upload);


module.exports = router;
