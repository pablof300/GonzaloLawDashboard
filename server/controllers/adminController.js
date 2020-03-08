const adminDAO = require("../dao/AdminDAO");
const catchErrors = require("../util/catchErrors");

exports.getAll = async (req, res) =>
  catchErrors(res, async () => {
    return adminDAO.getAll();
  });

exports.get = async (req, res) =>
  catchErrors(res, async () => {
    return adminDAO.get(req.userId);
  });

exports.update = async (req, res) =>
  catchErrors(res, async () => {
    return adminDAO.update(req.userId, req.body);
  });

exports.create = async (req, res) =>
  catchErrors(res, async () => {
    return adminDAO.create(req.body);
  });

exports.delete = async (req, res) =>
  catchErrors(res, async () => {
    return adminDAO.delete(req.userId);
  });

exports.getClient = async (req, res) =>
  catchErrors(res, async () => {
    return adminDAO.getClient(req.userId, req.body);
  });

exports.removeClient = async (req, res) =>
  catchErrors(res, async () => {
    return adminDAO.removeClient(req.userId, req.body);
  });

exports.addClient = async (req, res) =>
  catchErrors(res, async () => {
    return adminDAO.addClient(req.userId, req.body);
  });
