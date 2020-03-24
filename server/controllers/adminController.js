const adminDAO = require("../dao/AdminDAO");
const catchErrors = require("../util/catchErrors.js");

exports.getAll = async (req, res) => {
  catchErrors(res, async () => {
    return adminDAO.getAll();
  });
}

exports.get = async (req, res) => {
  catchErrors(res, async () => {
    return adminDAO.get(req.params.id);
  });
}

exports.update = async (req, res) => {
  catchErrors(res, async () => {
    return adminDAO.update(req.params.id, req.body);
  });
}

exports.create = async (req, res) =>
  catchErrors(res, async () => {
    return adminDAO.create(req.body);
  });

exports.delete = async (req, res) =>
  catchErrors(res, async () => {
    return adminDAO.delete(req.params.id);
  });

exports.getClient = async (req, res) =>
  catchErrors(res, async () => {
    return adminDAO.getClient(req.params.id, req.params.clientId);
  });

exports.removeClient = async (req, res) =>
  catchErrors(res, async () => {
    return adminDAO.removeClient(req.params.id, req.params.clientId);
  });

exports.addClient = async (req, res) =>
  catchErrors(res, async () => {
    return adminDAO.addClient(req.params.id, req.params.clientId);
  });
