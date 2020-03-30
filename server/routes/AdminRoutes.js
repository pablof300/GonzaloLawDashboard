const adminController = require("../controllers/adminController");
const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get(
  "/getAll",
  passport.authenticate("adminLoggedIn", { session: false }),
  adminController.getAll
);
router.get(
  "/",
  passport.authenticate("adminLoggedIn", { session: false }),
  adminController.get
);
router.put(
  "/",
  passport.authenticate("adminLoggedIn", { session: false }),
  adminController.update
);
router.post("/", adminController.create); //add some sort of key admins need to create a new admin account so users cannot
router.delete(
  "/",
  passport.authenticate("adminLoggedIn", { session: false }),
  adminController.delete
);

router.get(
  "/clients",
  passport.authenticate("adminLoggedIn", { session: false }),
  adminController.getAllClients
)

router.get(
  "/:clientId",
  passport.authenticate("adminLoggedIn", { session: false }),
  adminController.getClient
);

router.put(
  "/remove/:clientId",
  passport.authenticate("adminLoggedIn", { session: false }),
  adminController.removeClient
);

router.put(
  "/add/:clientId",
  passport.authenticate("adminLoggedIn", { session: false }),
  adminController.addClient
);

module.exports = router;
