const config = require('../config/config')
const AWS = require("aws-sdk");



/*AWS.config.update({
  region: 'us-east-1',
  accessKeyId: process.env.AWSAccessKeyId,
  secretAccessKey: process.env.AWSSecretKey
});*/

AWS.config.update({
  region: "us-east-1",
  accessKeyId: config.Aws.AWSAccessKeyId,
  secretAccessKey: config.Aws.AWSSecretKey
});

// configure AWS to work with promises
//AWS.config.setPromisesDependency(bluebird);
const S3_BUCKET = config.Aws.bucket;

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
  s3.getSignedUrl("putObject", s3Params, (err, data) => {
    if (err) {
      console.error(err);
      res.json({ success: false, error: err });
    }
    //const id = fileName + '_' + (Math.floor((Math.random() * 100000)))
    
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };
    res.json({ success: true, data: { returnData } });
  });
};

exports.delete_s3 = (req, res) => {
  const s3 = new AWS.S3();
  const name = req.params.fileName;
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: name
  };
  s3.deleteObject(s3Params, function(err, data) {
    if (err) console.error(err);
    // error
    else res.json({ success: true, data: { data } });
    // deleted
  });
};
