const express = require("express");
const app = express();
const AWS = require("aws-sdk");
const fs = require("fs");
const fileType = require("file-type");
const bluebird = require("bluebird");
const multiparty = require("multiparty");
require("dotenv").config();

AWS.config.update({
  accessKeyId: process.env.AWSAccessKeyId,
  secretAccessKey: process.env.AWSSecretKey
});

// configure AWS to work with promises
exports.upload = (buffer, name, type) => {
  AWS.config.setPromisesDependency(bluebird);
  const s3 = new AWS.S3();
  const s3Params = {
    ACL: "public-read",
    Body: buffer,
    Bucket: process.env.Bucket,
    ContentType: type.mime,
    Key: `${name}.${type.ext}`
  };

  return s3.upload(s3Params).promise();
  
};

app.post("/fileUpload", (request, response) => {
  const form = new multiparty.Form();
  form.parse(request, async (error, fields, files) => {
    if (error) throw new Error(error);
    try {
      const path = files.file[0].path;
      const buffer = fs.readFileSync(path);
      const type = fileType(buffer);
      const timestamp = Date.now().toString();
      const fileName = `bucketFolder/${timestamp}-lg`;
      const data = await upload(buffer, fileName, type);
      console.log(data)
      return response.status(200).send(data);
    } catch (error) {
      return response.status(400).send(error);
    }
  });
});
