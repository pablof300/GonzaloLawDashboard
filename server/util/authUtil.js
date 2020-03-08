const jwt = require("jsonwebtoken");

exports.tokanizeUser = user => {
  return jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET || require("../config/config").db.uri
  );
};
