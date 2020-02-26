const adminController = require("../controllers/adminController");
const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get(
	"/",
	passport.authenticate("loggedIn", { session: false }),
	adminController.getAll
);
router.get(
	"/:id",
	passport.authenticate("loggedIn", { session: false }),
	adminController.get
);
router.put(
	"/:id",
	passport.authenticate("loggedIn", { session: false }),
	adminController.update
);
router.post("/", userController.create);
router.delete(
	"/:id",
	passport.authenticate("loggedIn", { session: false }),
	adminController.delete
);

/*router.get(
	"/:id/:clientId",
	passport.authenticate("loggedIn", { session: false }),
	adminController.getClient
);*/

router.put(
	"/:id/remove/:clientId",
	passport.authenticate("loggedIn", { session: false }),
	adminController.update
);

router.put(
	"/:id/add/:clientId",
	passport.authenticate("loggedIn", { session: false }),
	adminController.update
);

module.exports = router;
