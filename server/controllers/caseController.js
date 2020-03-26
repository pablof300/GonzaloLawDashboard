const caseDAO = require("../dao/CaseDAO.js");
const catchErrors = require("../util/catchErrors");

exports.getAll = async (req, res) =>
  catchErrors(res, async () => {
    return caseDAO.getAll();
  });  

exports.get = async (req, res) =>
  catchErrors(res, async () => {
    return caseDAO.get(req.params.id);
  });

exports.update = async (req, res) =>
  catchErrors(res, async () => {
    return caseDAO.update(req.params.id, req.body);
  }); 

exports.create = async (req, res) =>
  catchErrors(res, async () => {
    return caseDAO.create(req.body);
  });
  

exports.delete = async (req, res) =>
  catchErrors(res, async () => {
    return caseDAO.delete(req.params.id);
  });

 


