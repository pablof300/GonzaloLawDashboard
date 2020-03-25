const caseController = require("../controllers/caseController");
const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get(
  "/",
  passport.authenticate("loggedIn", { session: false }),
  caseController.getAll
);
router.get(
  "/:id",
  passport.authenticate("loggedIn", { session: false }),
  caseController.get
);
router.put(
  "/:id",
  passport.authenticate("adminLoggedIn", { session: false }),
  caseController.update
);
router.post(
  "/", 
  passport.authenticate("loggedIn", { session: false }),
  caseController.create
);
router.delete(
  "/:id",
  passport.authenticate("adminLoggedIn", { session: false }),
  caseController.delete
);



module.exports = router;
