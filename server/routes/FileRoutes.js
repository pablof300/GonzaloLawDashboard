const fileController = require("../controllers/fileController");
const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/:id", fileController.getAll);
router.get("/:id/:id", fileController.get);
router.post("/:id", fileController.create);
router.delete("/:id/:id", fileController.delete);

module.exports = router;
