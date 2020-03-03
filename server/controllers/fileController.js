const fileDAO = require('../dao/FileDAO')

const catchErrors = async (res, f) => {
  try {
    const result = await f();
    res.send({ ok: true, data: result })
  } catch (e) {
    if (e instanceof ValidationError) {
      res.status(e.httpErrorCode).send({ ok: false, error: e.message, validationErrors: e.validationErrors });
    } else if (e instanceof NotFoundError) {
      res.status(e.httpErrorCode).send({ ok: false, error: e.message });
    } else {
      res.status(400).send({ ok: false, error: e.message});i
    }
  }
};

exports.getAll = async (req, res) => catchErrors(res, async () => {
  return fileDAO.getAll();
});

exports.get = async (req, res) => catchErrors(res, async () => {
  return fileDAO.get(req.fileId);
});


exports.update = async (req, res) => catchErrors(res, async () => {
  return fileDAO.update(req.fileId, req.body);
});

exports.create = async (req, res) => catchErrors(res, async () => {
  return fileDAO.create(req.body);
});

exports.delete = async (req, res) => catchErrors(res, async () => {
  return fileDAO.delete(req.fileId);
});
