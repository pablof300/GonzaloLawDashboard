const { catchErrors } = require("../util/catchErrors");

exports.verifyUser = async (req, res) =>
  catchErrors(res, async () => {
      return !!req.userId;
  });

exports.verifyAdmin = async (req, res) =>
  catchErrors(res, async () => {
    return !!req.adminId;
  });