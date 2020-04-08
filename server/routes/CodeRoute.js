
const codeController = require("../controllers/codeController");
const express = require("express");
const router = express.Router();
const passport = require("passport");

router.post(
    "/mail",
    passport.authenticate("loggedIn", { session: false }),
    codeController.sendEmail
  );

  router.post(
    "/:id",
    passport.authenticate("loggedIn", { session: false }),
    codeController.createCode
  );

  router.get(
    "/",
    passport.authenticate("loggedIn", { session: false }),
    codeController.createCode
  );

  
  router.get(
    "/:passCode/:id",
    passport.authenticate("loggedIn", { session: false }),
    codeController.getCode
  );

  router.delete(
    "/",
    passport.authenticate("loggedIn", { session: false }),
    codeController.createCode
  );

  module.exports = router;