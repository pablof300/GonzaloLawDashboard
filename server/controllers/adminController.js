const adminDAO = require("../dao/AdminDAO");
const eventDAO = require("../dao/EventDAO");

catchErrors = async (res, f) => {
    try {
        const result = await f();
        res.send({ ok: true, data: result })
    } catch (e) {
        if (e instanceof ValidationError) {
            res.status(e.httpErrorCode).send({ ok: false, error: e.message, validationErrors: e.validationErrors });
        } else if (e instanceof NotFoundError) {
            res.status(e.httpErrorCode).send({ ok: false, error: e.message });
        } else {
            res.status(400).send({ ok: false, error: e.message});
        }
    }
};

exports.getAll = async (req, res) =>
  catchErrors(res, async () => {
    return adminDAO.getAll();
  });

exports.get = async (req, res) =>
  catchErrors(res, async () => {
    return adminDAO.get(req.adminID);
  });

exports.update = async (req, res) =>
  catchErrors(res, async () => {
    return adminDAO.update(req.adminID, req.body);
  });

exports.create = async (req, res) =>
  catchErrors(res, async () => {
    return adminDAO.create(req.body);
  });

exports.delete = async (req, res) =>
  catchErrors(res, async () => {
    return adminDAO.delete(req.adminID);
  });

exports.getClient = async (req, res) =>
  catchErrors(res, async () => {
    return adminDAO.getClient(req.adminID, req.body);
  });

exports.removeClient = async (req, res) =>
  catchErrors(res, async () => {
    return adminDAO.removeClient(req.adminID, req.body);
  });

exports.addClient = async (req, res) =>
  catchErrors(res, async () => {
    return adminDAO.addClient(req.adminID, req.body);
  });

exports.getEvents = async (req, res) =>
    catchErrors(res, async () => {
        return eventDAO.getEventsByAdmin(req.adminID);
    });
