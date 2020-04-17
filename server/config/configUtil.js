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

exports.getJWTSecret = () => {
  return process.env.JWT_SECRET || require("./config").jwtSecret;
};

exports.getDomain = () => {
  return require("./config").mailGun.domain;
};

exports.getAPIKey = () => {
  return require("./config").mailGun.apiKey;
};

exports.getIntuitClientID = () => {
  return process.env.INTUIT_CLIENT_ID || require("./config").QB.intuitClientID;
};

exports.getIntuitClientSecret = () => {
  return (
    process.env.INTUIT_CLIENT_SECRET ||
    require("./config").QB.intuitClientSecret
  );
};

exports.getIntuitRedirectUri = () => {
  return (
    process.env.INTUIT_REDIRECT_URI || require("./config").QB.intuitRedirectURI
  );
};

exports.getIntuitEnvironment = () => {
  return (
    process.env.INTUIT_ENVIRONMENT || require("./config").QB.intuitEnvironment
  );
};

exports.getIntuitCompany = () => {
  return process.env.INTUIT_COMPANY || require("./config").QB.intuitCompany;
};

exports.getIntuitItemId = () => {
  return process.env.INTUIT_ITEM_ID || require("./config").QB.intuitItemId;
};

exports.getDomain = () => {
  return process.env.MAILGUN_DOMAIN || require("./config").mailGun.domain;
};

exports.getAPIKey = () => {
  return process.env.MAILGUN_KEY || require("./config").mailGun.apiKey;
};
