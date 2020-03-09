exports.getDatabaseUri = () => {
  return process.env.DB_URI || require("./config").db.uri;
};

exports.getAWSAccessKeyId = () => {
  return process.env.AWS_accessKeyId || require("./config").AWS.AWS_accessKeyId;
};

exports.getAWSSecretKey = () => {
  return process.env.AWS_secretKey || require("./config").AWS.AWS_secretKey;
};

exports.getAWSBucket = () => {
  return process.env.AWS_bucket || require("./config").AWS.bucket;
};
