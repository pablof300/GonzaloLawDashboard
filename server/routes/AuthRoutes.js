const express = require("express");
const router = express.Router();
const LoginStrategy = require("../auth/login.js");
const passport = require("passport");
const authController = require('../controllers/authController');

router.post("/login/user", LoginStrategy.authenticateUser);
// router.post("/login/admin", LoginStrategy.authenticateAdmin);

router.get('/verify/user', passport.authenticate("loggedIn", { session: false }), authController.verifyUser);
// router.get('/verify/admin',  passport.authenticate("adminLoggedIn", { session: false }), authController.verifyAdmin);

module.exports = router;
