const fileDAO = require("../dao/FileDAO");
const UserDAO = require("../dao/UserDAO");

const catchErrors = async (res, f) => {
  try {
    const result = await f();
    res.send({ ok: true, data: result });
  } catch (e) {
    if (e instanceof ValidationError) {
      res.status(e.httpErrorCode).send({
        ok: false,
        error: e.message,
        validationErrors: e.validationErrors
      });
    } else if (e instanceof NotFoundError) {
      res.status(e.httpErrorCode).send({ ok: false, error: e.message });
    } else {
      res.status(400).send({ ok: false, error: e.message });
      i;
    }
  }
};

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
