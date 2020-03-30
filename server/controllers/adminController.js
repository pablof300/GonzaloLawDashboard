const adminDAO = require("../dao/AdminDAO");
const catchErrors = require("../util/catchErrors.js");

exports.getAll = async (req, res) => {
  catchErrors(res, async () => {
    return adminDAO.getAll();
  });
};

exports.get = async (req, res) => {
  catchErrors(res, async () => {
    return adminDAO.get(req.adminId); //gets the admin from the jwt token
  });
};

exports.update = async (req, res) => {
  catchErrors(res, async () => {
    return adminDAO.update(req.adminId, req.body);
  });
};

exports.create = async (req, res) =>
  catchErrors(res, async () => {
    return adminDAO.create(req.body);
  });

exports.delete = async (req, res) =>
  catchErrors(res, async () => {
    return adminDAO.delete(req.adminId);
  });

exports.getClient = async (req, res) =>
  catchErrors(res, async () => {
    return adminDAO.getClient(req.adminId, req.params.clientId);
  });

exports.removeClient = async (req, res) =>
  catchErrors(res, async () => {
    return adminDAO.removeClient(req.adminId, req.params.clientId);
  });

exports.addClient = async (req, res) =>
  catchErrors(res, async () => {
    return adminDAO.addClient(req.adminId, req.params.clientId);
  });

exports.getAllClients = async (req, res) =>
  catchErrors(res, async () => {
    return adminDAO.getAllClients(req.adminId);
  });

exports.getEvents = async (req, res) =>
    catchErrors(res, async () => {
        return eventDAO.getEventsByAdmin(req.adminID);
    });
