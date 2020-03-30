const catchErrors = require("../util/catchErrors");
const userDAO = require("../dao/UserDAO");

exports.getAll = async (req, res) =>
  catchErrors(res, async () => {
    return userDAO.getAll();
  });

exports.get = async (req, res) => {
  catchErrors(res, async () => {
    return userDAO.get(req.userId);
  });
};

exports.update = async (req, res) =>
  catchErrors(res, async () => {
    return userDAO.update(req.userId, req.body);
  });

exports.create = async (req, res) =>
  catchErrors(res, async () => {
    return userDAO.create(req.body);
  });

exports.delete = async (req, res) =>
  catchErrors(res, async () => {
    return userDAO.delete(req.userId);
  });
