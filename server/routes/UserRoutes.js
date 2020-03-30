const userController = require("../controllers/userController");
const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get(
  "/getAll",
  passport.authenticate("loggedIn", { session: false }),
  userController.getAll
);
router.get(
  "/",
  passport.authenticate("loggedIn", { session: false }),
  userController.get
);
router.put(
  "/",
  passport.authenticate("loggedIn", { session: false }),
  userController.update
);

router.post("/", userController.create);
router.delete(
  "/",
  passport.authenticate("loggedIn", { session: false }),
  userController.delete
);

module.exports = router;
