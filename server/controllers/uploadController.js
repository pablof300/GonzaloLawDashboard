const express = require("express");
const app = express();
const AWS = require("aws-sdk");
const fs = require("fs");
const fileType = require("file-type");
const bluebird = require("bluebird");
const multiparty = require("multiparty");
require("dotenv").config();

/*AWS.config.update({
  region: 'us-east-1',
  accessKeyId: process.env.AWSAccessKeyId,
  secretAccessKey: process.env.AWSSecretKey
});*/


AWS.config.update({
  region: 'us-east-1',
  accessKeyId: "AKIAJVC36NXPVWJLHJPQ",
  secretAccessKey: "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"
});


// configure AWS to work with promises
//AWS.config.setPromisesDependency(bluebird);
const S3_BUCKET = "gonza99"

exports.sign_s3 = (req, res) => {
  
  const s3 = new AWS.S3();
  const fileName = req.body.fileName;
  const fileType = req.body.fileType;
  const s3Params = {
    ACL: "public-read",
    Bucket: S3_BUCKET,
    ContentType: fileType,
    Key: fileName,
    Expires: 500
  };

  //return s3.upload(s3Params).promise();
  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      console.error(err);
      res.json({success: false, error: err})
    }

    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    }
    res.json({success:true, data:{returnData}})
  })
  
};

/*app.post("/fileUpload", (request, response) => {
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
});*/
