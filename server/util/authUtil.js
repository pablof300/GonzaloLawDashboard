const jwt = require("jsonwebtoken");

exports.tokanizeUser = user => {
  console.log("Secret is ")
  console.log(process.env.JWT_SECRET || require("../config/config").db.uri)
  return jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET || require("../config/config").db.uri
  );
};
