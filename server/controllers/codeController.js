const catchErrors = require("../util/catchErrors");
const CodeDAO = require("../dao/CodeDAO");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const nodemailer = require("nodemailer");

const fromEmail = "angelgab2222@gmail.com";
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: fromEmail,
    pass: "computer100gab",
  },
});

exports.createCode = async (req, res) =>
  catchErrors(res, async () => {
    return CodeDAO.createCode(req.params.id);
  });

exports.getCode = async (req, res) =>
  catchErrors(res, async () => {
    return CodeDAO.codeExist(req.params.passCode, req.params.id);
  });

exports.sendEmail = (req, res) => {
  const mailOptions = req.body;
  console.log(mailOptions);
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return error;
    } else {
      console.log("Email sent: " + info.response);
      return info.response;
    }
  });
};
