const jwt = require("jsonwebtoken");
const configUtil = require("../config/configUtil");

exports.tokanizeUser = user => {
  let token = jwt.sign({ id: user.id }, configUtil.getJWTSecret());
  console.log("token is ");
  console.log(token);
  return token;
};
