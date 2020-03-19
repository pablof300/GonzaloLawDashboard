const caseDAO = require("../dao/CaseDAO");
const catchErrors = require("../util/catchErrors");

exports.getAll = async (req, res) =>
  catchErrors(res, async () => {
    return caseDAO.getAll();
  });

exports.get = async (req, res) =>
  catchErrors(res, async () => {
    return caseDAO.get(req.caseID);
  });

exports.update = async (req, res) =>
  catchErrors(res, async () => {
    return caseDAO.update(req.caseID, req.body);
  });

exports.create = async (req, res) =>
  catchErrors(res, async () => {
    return caseDAO.create(req.body);
  });

exports.delete = async (req, res) =>
  catchErrors(res, async () => {
    return caseDAO.delete(req.caseID);
  });

  //example code left over :)
/* exports.getClient = async (req, res) =>
  catchErrors(res, async () => {
    return caseDAO.getClient(req.adminID, req.body);
  }); */


