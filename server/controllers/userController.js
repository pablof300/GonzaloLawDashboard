const catchErrors = require("../util/catchErrors");
const userDAO = require("../dao/UserDAO");
const configUtil = require("../config/configUtil");
const eventDAO = require("../dao/EventDAO");

const mailGun = require("mailgun-js");

const mg = mailGun({
  apiKey: configUtil.getAPIKey(),
  domain: configUtil.getDomain(),
});

exports.getAll = async (req, res) =>
  catchErrors(res, async () => {
    return userDAO.getAll();
  });

exports.get = async (req, res) => {
  catchErrors(res, async () => {
    return userDAO.get(req.userId);
  });
};

exports.getUserByEmail = async (req, res) => {
  catchErrors(res, async () => {
    return userDAO.getUserByEmail(req.params.email);
  });
};

exports.getById = async (req, res) => {
  catchErrors(res, async () => {
    return userDAO.getById(req.params.id);
  });
};

exports.update = async (req, res) =>
  catchErrors(res, async () => {
    return userDAO.update(req.userId, req.body);
  });

  exports.updateUserPassword = async (req, res) =>
  catchErrors(res, async () => {
    const user = await userDAO.updateUserPassword(req.params.id, req.body)
    return user._id;
  });

exports.delete = async (req, res) =>
  catchErrors(res, async () => {
    return userDAO.delete(req.userId);
  });

exports.getEvents = async (req, res) =>
  catchErrors(res, async () => {
      console.log("Attempting getting id for " + req.userId)
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

exports.sendMessage = async (req, res) => {
  let mailOptions = req.body;
  const results = await mg.messages().send(mailOptions).then(data => {
    console.log(data)
   return true;
  }).catch(error => {
    console.log(error)
    return false;
  })
  return results;
};

exports.updateCase = async (req, res) =>
  catchErrors(res, async () => {
    return userDAO.updateCase(req.params.id, req.body, req.params.caseid);
  });

exports.deleteCase = async (req, res) =>
  catchErrors(res, async () => {
    return userDAO.deleteCaseById(req.params.id, req.params.caseid);
  });
