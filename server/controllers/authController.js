const adminDAO = require("../dao/AdminDAO");
const { catchErrors } = require("../util/catchErrors");

exports.verifyUser = async (req, res) =>
  catchErrors(res, async () => {
      console.log(JSON.stringify(req.headers))
      return !!req.userId;
  });

exports.verifyAdmin = async (req, res) =>
  catchErrors(res, async () => {
    return !!req.adminId;
  });