const oauthClient = require("../client/quickbooks").getOauthClient();

exports.get = async (req, res) => {
  catchErrors(res, async () => {
    return "CAT";
  });
};

exports.callback = async (req, res) => {
    console.log("ATTEMPTING THIS");
    console.log(url);
    oauthClient.createToken(req.url)
       .then(function(authResponse) {
             oauth2_token_json = JSON.stringify(authResponse.getJson(), null,2);
         })
        .catch(function(e) {
             console.error(e);
         });
    res.send('');
};
