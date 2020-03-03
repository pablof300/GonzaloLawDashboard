const userController = require("../controllers/userController");
const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/", passport.authenticate("loggedIn", { session: false }), userController.getAll);
router.get("/:id", passport.authenticate("loggedIn", { session: false }), userController.get);
router.put("/:id", passport.authenticate("loggedIn", { session: false }),  userController.update);
router.post("/", userController.create);
router.delete("/:id", passport.authenticate("loggedIn", { session: false }), userController.delete);

module.exports = router;
