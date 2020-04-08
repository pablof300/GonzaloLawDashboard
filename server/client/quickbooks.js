const configUtil = require("../config/configUtil");
const OAuthClient = require('intuit-oauth');

const environment = "Sandbox"
const redirectUri = "http://localhost:5000/payments/callback"

let oauth2_token_json = null;
let oauthClient = null;

//initializing our OAuth client with config info
exports.getOauthClient = () => {
  oauthClient = new OAuthClient({
      clientId: configUtil.getIntuitClientID(),
      clientSecret: configUtil.getIntuitClientSecret(),
      environment: environment,
      redirectUri: redirectUri,
      logging: false
  });

  const authUri = oauthClient.authorizeUri({scope:[OAuthClient.scopes.Accounting],state:'intuit-test'});
  console.log("Initialized oauthClient");
  console.log(oauthClient);
  console.log(authUri);

  if(oauthClient.isAccessTokenValid()) {
     console.log("The access_token is valid");
  } else {
    console.log("TOKEN IS NOT VALID");
    console.log("TOKEN IS NOT VALID");
    console.log("TOKEN IS NOT VALID");
  }
}

// app.get('/callback', function(req, res) {
//     oauthClient.createToken(req.url)
//        .then(function(authResponse) {
//              oauth2_token_json = JSON.stringify(authResponse.getJson(), null,2);
//          })
//         .catch(function(e) {
//              console.error(e);
//          });
//     res.send('');
// });

// const retrieveToken = () => function(req, res) {
//     res.send(oauth2_token_json);
//  });

//
// // home route
// app.get('/', function(req, res) {
//     res.render('index');
// });
//
// //get authURI
// app.get('/authUri', urlencodedParser, function(req,res) {
//     oauthClient = new OAuthClient({
//         clientId: req.query.json.clientId,
//         clientSecret: req.query.json.clientSecret,
//         environment: req.query.json.environment,
//         redirectUri: req.query.json.redirectUri
//     });
//
//     const authUri = oauthClient.authorizeUri({scope:[OAuthClient.scopes.Accounting],state:'intuit-test'});
//     res.send(authUri);
// });
//
// // get callback to get the token extracted
// app.get('/callback', function(req, res) {
//     oauthClient.createToken(req.url)
//        .then(function(authResponse) {
//              oauth2_token_json = JSON.stringify(authResponse.getJson(), null,2);
//          })
//         .catch(function(e) {
//              console.error(e);
//          });
//     res.send('');
// });
//
// // display token caution
// app.get('/retrieveToken', function(req, res) {
//     res.send(oauth2_token_json);
// });
//
// // refresh access token
// app.get('/refreshAccessToken', function(req,res){
//     oauthClient.refresh()
//         .then(function(authResponse){
//             console.log('The Refresh Token is  '+ JSON.stringify(authResponse.getJson()));
//             oauth2_token_json = JSON.stringify(authResponse.getJson(), null,2);
//             res.send(oauth2_token_json);
//         })
//         .catch(function(e) {
//             console.error(e);
//         });
// });
//
// // getCompanyInfo
// app.get('/getCompanyInfo', function(req,res){
//     const companyID = oauthClient.getToken().realmId;
//     const url = oauthClient.environment == 'sandbox' ? OAuthClient.environment.sandbox : OAuthClient.environment.production ;
//
//     oauthClient.makeApiCall({url: url + 'v3/company/' + companyID +'/companyinfo/' + companyID})
//         .then(function(authResponse){
//             console.log("The response for API call is :"+JSON.stringify(authResponse));
//             console.log("Is this where this is going?");
//             res.send(JSON.parse(authResponse.text()));
//         })
//         .catch(function(e) {
//             console.error(e);
//         });
// });
//
// // get a customer
// app.get('/getCustomer', function(req,res){
//     const companyID = oauthClient.getToken().realmId;
//     const url = oauthClient.environment == 'sandbox' ? OAuthClient.environment.sandbox : OAuthClient.environment.production ;
//
//     oauthClient.makeApiCall({url: url + 'v3/company/' + companyID + '/query?query=select * from Customer&minorversion=47'})
//         .then(function(authResponse){
//             console.log("The response for API call is :"+JSON.stringify(authResponse));
//             console.log("Is this where this is going?");
//             res.send(JSON.parse(authResponse.text()));
//         })
//         .catch(function(e) {
//             console.error(e);
//         });
// });
//
// // disconnect
// app.get('/disconnect', function(req,res){
//   console.log('The disconnect called ');
//   const authUri = oauthClient.authorizeUri({scope:[OAuthClient.scopes.OpenId,OAuthClient.scopes.Email],state:'intuit-test'});
//   res.redirect(authUri);
// });

// start server on http
// const server = app.listen(process.env.PORT || 8000, () => {
//     console.log(`💻 Server listening on port ${server.address().port}`);
// if(!ngrok){
//     redirectUri = `${server.address().port}` + '/callback';
//     console.log(`💳  Step 1 : Paste this URL in your browser : ` + 'http://localhost:' + `${server.address().port}`);
//     console.log('💳  Step 2 : Copy and Paste the clientId and clientSecret from : https://developer.intuit.com')
//     console.log(`💳  Step 3 : Copy Paste this callback URL into redirectURI :` + 'http://localhost:' + `${server.address().port}` + '/callback');
//     console.log(`💻  Step 4 : Make Sure this redirect URI is also listed under the Redirect URIs on your app in : https://developer.intuit.com`);
// }
//
// });
//
// // if were using ngrok
// if (ngrok) {
//     console.log("NGROK Enabled");
//     ngrok.connect({addr: process.env.PORT || 8000})
//         .then(url => {
//             redirectUri = url + '/callback';
//             console.log(`💳 Step 1 : Paste this URL in your browser :  ${url}`);
//             console.log('💳 Step 2 : Copy and Paste the clientId and clientSecret from : https://developer.intuit.com')
//             console.log(`💳 Step 3 : Copy Paste this callback URL into redirectURI :  ${redirectUri}`);
//             console.log(`💻 Step 4 : Make Sure this redirect URI is also listed under the Redirect URIs on your app in : https://developer.intuit.com`);
//
//         })
//         .catch(() => {
//             process.exit(1);
//         });
// }


// 'use strict';
// require('dotenv').config();
// /**
//  * Require the dependencies
//  * @type {*|createApplication}
//  */
// const express = require('express');
// const app = express();
// const path = require('path');
// const OAuthClient = require('intuit-oauth');
// const bodyParser = require('body-parser');
// const ngrok =  (process.env.NGROK_ENABLED==="true") ? require('ngrok'):null;
//
// // configure view and handlers
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(express.static(path.join(__dirname, '/public')));
// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');
// app.use(bodyParser.json())

// const urlencodedParser = bodyParser.urlencoded({ extended: false });
