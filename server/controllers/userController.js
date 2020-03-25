const userDAO = require("../dao/UserDAO");
const catchErrors = require("../util/catchErrors");

exports.getAll = async (req, res) =>
catchErrors(res, async () => {
  return userDAO.getAll();
}); 

exports.get = async (req, res) => 
  catchErrors(res, async () => {
    console.log("sent there good");
    console.log("req.userID is: " + req.userId)
    return userDAO.get(req.userId);
  }); 

exports.update = async (req, res) =>
  catchErrors(res, async () => {
    return userDAO.update(req.userId, req.body);
  });

exports.create = async (req, res) =>
  catchErrors(res, async () => {
    return userDAO.create(req.body);
  });

exports.delete = async (req, res) =>
  catchErrors(res, async () => {
    return userDAO.delete(req.userId);
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
    return userDAO.createCaseByUpdate(req.params.id, req.body);
  });

exports.deleteCase = async (req, res) =>
  catchErrors(res, async () => {
    return userDAO.deleteCaseById(req.params.id, req.params.caseid);
  });




