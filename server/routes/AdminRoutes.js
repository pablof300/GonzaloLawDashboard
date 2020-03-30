const adminController = require("../controllers/adminController");
const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get(
  "/all",
  passport.authenticate("adminLoggedIn", { session: false }),
  adminController.getAll
);
router.get(
  "/",
  passport.authenticate("adminLoggedIn", { session: false }),
  adminController.get
);
router.get(
    "/events",
    passport.authenticate("adminLoggedIn", { session: false }),
    adminController.getEvents
);
router.put(
  "/:id",
  passport.authenticate("adminLoggedIn", { session: false }),
  adminController.update
);
router.post("/", adminController.create); //add some sort of key admins need to create a new admin account so users cannot
router.delete(
  "/:id",
  passport.authenticate("adminLoggedIn", { session: false }),
  adminController.delete
);

router.get(
  "/:id/:clientId",
  passport.authenticate("adminLoggedIn", { session: false }),
  adminController.getClient
);

router.put(
  "/:id/remove/:clientId",
  passport.authenticate("adminLoggedIn", { session: false }),
  adminController.removeClient
);

router.put(
  "/:id/add/:clientId",
  passport.authenticate("adminLoggedIn", { session: false }),
  adminController.addClient
);

module.exports = router;
