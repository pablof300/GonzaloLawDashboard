const caseController = require("../controllers/caseController");
const express = require("express");
const router = express.Router();
const passport = require("passport");

//ask team whether I need to check for authenticate for cases!

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
  passport.authenticate("adminLoggedIn", { session: false }),
  caseController.create
);
router.delete(
  "/:id",
  passport.authenticate("adminLoggedIn", { session: false }),
  caseController.delete
);

//ask pablo if this is how it should be done

module.exports = router;
