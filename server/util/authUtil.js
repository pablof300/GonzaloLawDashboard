const jwt = require("jsonwebtoken");

exports.tokanizeUser = user => {
  console.log("Secret is ")
  console.log(process.env.JWT_SECRET || require("../config/config").db.uri)
  let token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || require("../config/config").db.uri
  );
  console.log("token is ");
  console.log(token);
  return token
};
