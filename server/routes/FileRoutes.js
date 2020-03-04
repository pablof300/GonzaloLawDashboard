const fileController = require("../controllers/fileController");
const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/", fileController.getAll);
router.get("/:id", fileController.get);
router.post("/", fileController.create);
router.delete("/:id", fileController.delete);

module.exports = router;
