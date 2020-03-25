const userController = require("../controllers/userController");
const caseController = require("../controllers/caseController");
const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get(
  "/",
  passport.authenticate("loggedIn", { session: false }),
  userController.getAll
);
router.get(
  "/:id",
  passport.authenticate("loggedIn", { session: false }),
  userController.get
);
router.put(
  "/:id",
  passport.authenticate("loggedIn", { session: false }),
  userController.update
);
router.post("/", userController.create);
router.delete(
  "/:id",
  passport.authenticate("loggedIn", { session: false }),
  userController.delete
);

//Routes for cases through the user...mainly for admin usage
//get all cases for a specific user
router.get(
  "/:id/cases",
  passport.authenticate("loggedIn", { session: false}),
  userController.getCases
);

router.get(
  "/:id/:caseid",
  passport.authenticate("adminLoggedIn", { session: false}),
  userController.getCase
); 

router.post(
  "/:id/cases",
  passport.authenticate("adminLoggedIn", { session: false}),
  userController.createCase
);

router.delete(
"/:id/:caseid",
//passport.authenticate("adminLoggedIn", { session: false}),
userController.deleteCase
);

module.exports = router;
