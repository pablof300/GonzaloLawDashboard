const adminDAO = require("../dao/AdminDAO");
const eventDAO = require("../dao/EventDAO");
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

exports.getById = async (req, res) => {
  catchErrors(res, async () => {
    return adminDAO.getById(req.params.id);
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
    return adminDAO.addClient(req.adminId, req.body);
  });

exports.addExistingClient = async (req, res) =>
  catchErrors(res, async () => {
    return adminDAO.addExistingClient(req.adminId, req.params.clientId);
  });

exports.getAllClients = async (req, res) =>
  catchErrors(res, async () => {
    return adminDAO.getAllClients(req.adminId);
  });

exports.getAllOtherClients = async (req, res) =>
  catchErrors(res, async () => {
    return adminDAO.getAllOtherClients(req.adminId)
  });

exports.getEvents = async (req, res) =>
  catchErrors(res, async () => {
    return eventDAO.getEventsByAdmin(req.adminId);
  });

exports.addEvent = async (req, res) =>
  catchErrors(res, async () => {
    let startDate = new Date(req.query.startDate);
    let endDateTime = new Date(req.query.startDate).getTime();
    endDateTime += (req.query.duration * 60 * 1000);

    let event = { title: req.query.title, type: req.query.type, startDate: startDate, endDate: new Date(endDateTime), notes: req.query.notes, admins: [req.adminId], users: [req.query.clientId] }
    console.log(event)
    return eventDAO.addEvent(event)
  });