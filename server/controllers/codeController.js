const catchErrors = require("../util/catchErrors");
const configUtil = require("../config/configUtil");
const CodeDAO = require("../dao/CodeDAO");
const mailGun = require('mailgun-js');

const mg = mailGun({apiKey: configUtil.getAPIKey(), domain: configUtil.getDomain()});

exports.createCode = async (req, res) =>
  catchErrors(res, async () => {
    return CodeDAO.createCode(req.params.id);
  });

exports.getCode = async (req, res) =>
  catchErrors(res, async () => {
    return CodeDAO.codeExist(req.params.passCode, req.params.id);
  });

exports.sendEmail = (req, res) => { 
let mailOptions = req.body;
mg.messages().send(mailOptions, function (error, body) {
  if(error) console.log(error)
	console.log(body);
}); 
};

exports.sendMessage = (req, res) => { 
  let mailOptions = req.body;
  mg.messages().send(mailOptions, function (error, body) {
    if(error) console.log(error)
  }); 
  };

