const userController = require("../controllers/userController");
const express = require("express");
const router = express.Router();
const passport = require("passport");

catchErrors = async (res, f) => {
    try {
        const result = await f();
        res.send({ ok: true, data: result })
    } catch (e) {
        if (e instanceof ValidationError) {
            res.status(e.httpErrorCode).send({ ok: false, error: e.message, validationErrors: e.validationErrors });
        } else if (e instanceof NotFoundError) {
            res.status(e.httpErrorCode).send({ ok: false, error: e.message });
        } else {
            res.status(400).send({ ok: false, error: e.message});
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

router.post("/", userController.create);
router.delete(
  "/",
  passport.authenticate("loggedIn", { session: false }),
  userController.delete
);

module.exports = router;
