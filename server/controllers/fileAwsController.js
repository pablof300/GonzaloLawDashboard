const configUtil = require("../config/configUtil");
const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1",
  accessKeyId: configUtil.getAWSAccessKeyId(),
  secretAccessKey: configUtil.getAWSSecretKey()
});

// configure AWS to work with promises
const S3_BUCKET = configUtil.getAWSBucket();

exports.sign_s3 = (req, res) => {
  const s3 = new AWS.S3();
  const fileName = req.body.fileName;
  const fileType = req.body.fileType;
  const subFolder = req.body.folder;
  const userID = req.body.userID;
  const userSubFolderUnderBucket = `${S3_BUCKET}/${userID}/${subFolder}`;
  const s3Params = {
    ACL: "public-read",
    Bucket: userSubFolderUnderBucket,
    ContentType: fileType,
    Key: fileName,
    Expires: 500
  };

  s3.getSignedUrl("putObject", s3Params, (err, data) => {
    if (err) {
      console.error(err);
      res.json({ success: false, error: err });
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${userID}/${subFolder}/${fileName}`
    };
    res.json({ success: true, data: { returnData } });
  });
};

exports.delete_s3 = (req, res) => {
  const s3 = new AWS.S3();
  const fileName = req.body.fileName;
  const userID = req.body.userID;
  const subFolder = req.body.folder;
  const userSubFolderUnderBucket = `${S3_BUCKET}/${userID}/${subFolder}`;
  const s3Params = {
    Bucket: userSubFolderUnderBucket,
    Key: fileName
  };
  s3.deleteObject(s3Params, function(err, data) {
    if (err) console.error(err);
    // error
    else res.json({ success: true, data: { data } });
    // deleted
  });
};
