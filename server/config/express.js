require("../auth/passport");
const path = require("path")
const express = require("express")
const mongoose = require("mongoose")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const userRoutes = require("../routes/UserRoutes.js")
const authRoutes = require("../routes/AuthRoutes.js")
const configUtil = require("./configUtil.js")
const cors = require('cors')

module.exports.init = () => {
  mongoose.connect(configUtil.getDatabaseUri(), {
    useNewUrlParser: true
  });
  mongoose.set("useCreateIndex", true);
  mongoose.set("useFindAndModify", false);

  const app = express();

  app.use(morgan("dev"));
  app.use(bodyParser.json());
  app.use(cors())

  app.use("/user", userRoutes);
  app.use("/auth", authRoutes);

  if (process.env.NODE_ENV === "production") {
    // Serve any static files
    app.use(express.static(path.join(__dirname, "../../client/build")));

    // Handle React routing, return all requests to React app
    app.get("*", function(req, res) {
      res.sendFile(path.join(__dirname, "../../client/build", "index.html"));
    });
  }

  return app;
};
