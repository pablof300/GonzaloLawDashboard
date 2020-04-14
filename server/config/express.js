require("../auth/passport.js");
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const userRoutes = require("../routes/UserRoutes.js");
const adminRoutes = require("../routes/AdminRoutes.js");
const caseRoutes = require("../routes/CaseRoutes.js");
const authRoutes = require("../routes/AuthRoutes.js");
const fileRoutes = require("../routes/FileRoutes");
const fileAwsRoute = require("../routes/FileAwsRoutes");
const codeRoute = require("../routes/CodeRoute");
const paymentsRoute = require("../routes/PaymentRoutes");
const configUtil = require("./configUtil.js");
const cors = require("cors");

module.exports.init = () => {
  mongoose.connect(configUtil.getDatabaseUri(), {
    useNewUrlParser: true
  });
  mongoose.set("useCreateIndex", true);
  mongoose.set("useFindAndModify", false);

  const app = express();

  app.use(morgan("dev"));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cors());

  app.use("/user", userRoutes);
  app.use("/case", caseRoutes);
  app.use("/admin", adminRoutes);
  app.use("/auth", authRoutes);
  app.use("/files", fileRoutes);
  app.use("/fileAws", fileAwsRoute);
  app.use("/codes", codeRoute);


  if (process.env.NODE_ENV === "production") {
    // Serve any static files
    app.use(express.static(path.join(__dirname, "../../client/build")));

    app.use("/payments", paymentsRoute);

    // Handle React routing, return all requests to React app
    app.get("*", function(req, res) {
      res.sendFile(path.join(__dirname, "../../client/build", "index.html"));
    });
  }


  return app;
};
