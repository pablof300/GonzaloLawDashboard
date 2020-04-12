const catchErrors = require("../util/catchErrors");
const userDAO = require("../dao/UserDAO");
const eventDAO = require("../dao/EventDAO");

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

exports.delete = async (req, res) =>
  catchErrors(res, async () => {
    return userDAO.delete(req.userId);
  });

exports.getEvents = async (req, res) =>
  catchErrors(res, async () => {
    return eventDAO.getEventsByUser(req.userId);
  });

exports.getCases = async (req, res) =>
  catchErrors(res, async () => {
    return userDAO.getCases(req.params.id);
  });

exports.getCase = async (req, res) =>
  catchErrors(res, async () => {
    return userDAO.getCase(req.params.id, req.params.caseid);
  });

exports.createCase = async (req, res) =>
  catchErrors(res, async () => {
    return userDAO.createCase(req.params.id, req.body);
  });

exports.updateCase = async (req, res) =>
  catchErrors(res, async () => {
    return userDAO.updateCase(req.params.id, req.body, req.params.caseid);
  });

exports.deleteCase = async (req, res) =>
  catchErrors(res, async () => {
    return userDAO.deleteCaseById(req.params.id, req.params.caseid);
  });
