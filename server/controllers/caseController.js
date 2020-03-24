const caseDAO = require("../dao/CaseDAO.js");
const userDAO = require("../dao/UserDAO.js");
const catchErrors = require("../util/catchErrors");



//works
exports.getAll = async (req, res) =>
  catchErrors(res, async () => {
    console.log("got sent to case/getAll");
    return caseDAO.getAll();
  });  
//works
exports.get = async (req, res) =>
  catchErrors(res, async () => {
    return caseDAO.get(req.params.id);
  });
//auto 404's
exports.update = async (req, res) =>
  catchErrors(res, async () => {
    return caseDAO.update(req.params.id, req.body);
  }); 

exports.create = async (req, res) =>
  catchErrors(res, async () => {
    /* const userID = req.params.userID;
    const case_ = await caseDAO.create(req.body);
    return userDAO.createCaseByUpdate(userID, case_); */
    console.log(req.body);
    return caseDAO.create(req.body);
  });
  
//auto 404s
exports.delete = async (req, res) =>
  catchErrors(res, async () => {
    //const userID = req.userID;
    //await userDAO.deleteCaseByID(userID, req.params.id);
    return caseDAO.delete(req.params.id);
  });

 


