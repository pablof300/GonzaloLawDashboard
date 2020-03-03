const fileController = require("../controllers/fileController");
const express = require("express");
const router = express.Router();
const passport = require("passport");



router.get("/", passport.authenticate("loggedIn", { session: false }), fileController.getAll);
router.get("/:id", passport.authenticate("loggedIn", { session: false }), fileController.get);
router.post("/", fileController.create);
router.delete("/:id", passport.authenticate("loggedIn", { session: false }), fileController.delete);

module.exports = router;
