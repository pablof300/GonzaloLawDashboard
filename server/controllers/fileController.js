const catchErrors = require("../util/catchErrors");
const fileDAO = require("../dao/FileDAO");
const UserDAO = require("../dao/UserDAO");

exports.getAll = async (req, res) =>
  catchErrors(res, async () => {
    return fileDAO.getAll();
  });

exports.get = async (req, res) =>
  catchErrors(res, async () => {
    return fileDAO.get(req.params.id);
  });

exports.create = async (req, res) =>
  catchErrors(res, async () => {
    const userId = req.userId;
    const files = await fileDAO.create(req.body);
    return UserDAO.addFileToUser(userId, files);
  });

exports.delete = async (req, res) =>
  catchErrors(res, async () => {
    const userId = req.userId;
    await UserDAO.deleteFileById(userId, req.params.id);
    return fileDAO.delete(req.params.id);
  });
