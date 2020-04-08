const userController = require("../controllers/userController");
const caseController = require("../controllers/caseController");
const express = require("express");
const router = express.Router();
const passport = require("passport");

catchErrors = async (res, f) => {
  try {
    const result = await f();
    res.send({ ok: true, data: result });
  } catch (e) {
    if (e instanceof ValidationError) {
      res
        .status(e.httpErrorCode)
        .send({
          ok: false,
          error: e.message,
          validationErrors: e.validationErrors
        });
    } else if (e instanceof NotFoundError) {
      res.status(e.httpErrorCode).send({ ok: false, error: e.message });
    } else {
      res.status(400).send({ ok: false, error: e.message });
    }
  }
};

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
router.get(
  "/events",
  passport.authenticate("loggedIn", { session: false }),
  userController.getEvents
);
router.put(
  "/",
  passport.authenticate("loggedIn", { session: false }),
  userController.update
);

router.delete(
  "/",
  passport.authenticate("loggedIn", { session: false }),
  userController.delete
);

//Routes for cases through the user...mainly for admin usage

router.get(
  "/:id/cases",
  passport.authenticate("loggedIn", { session: false }),
  userController.getCases
);

router.get(
  "/:id/:caseid",
  passport.authenticate("adminLoggedIn", { session: false }),
  userController.getCase
);

router.post(
  "/:id/cases",
  passport.authenticate("adminLoggedIn", { session: false }),
  userController.createCase
);



router.put(
  "/:id/:caseid",
  passport.authenticate("adminLoggedIn", { session: false }),
  userController.updateCase
);

router.delete(
  "/:id/:caseid",
  passport.authenticate("adminLoggedIn", { session: false }),
  userController.deleteCase
);

module.exports = router;
