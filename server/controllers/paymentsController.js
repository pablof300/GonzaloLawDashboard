const configUtil = require("../config/configUtil");
const OAuthClient = require("intuit-oauth");
const axios = require("axios");

let authToken = null;
let oauthClient = new OAuthClient({
  clientId: configUtil.getIntuitClientID(),
  clientSecret: configUtil.getIntuitClientSecret(),
  environment: configUtil.getIntuitEnvironment(),
  redirectUri: configUtil.getIntuitRedirectUri()
});

exports.getOAuthURL = async (req, res) => {
  console.log("Established oauthClient");

  const authUri = oauthClient.authorizeUri({
    scope: [OAuthClient.scopes.Accounting],
    state: "intuit-test"
  });

  console.log(authUri);
  res.send({ ok: true, data: authUri });
};

exports.createInvoice = async (req, res) => {
  if (!getAuthStatus()) {
    res.send(false);
  }

  console.log("Making request to ");
  console.log(
    getQueryURL(
      `select * from Customer Where DisplayName='${req.body.customerName}'`
    )
  );

  oauthClient
    .makeApiCall({
      url: getQueryURL(
        `select * from Customer Where DisplayName='${req.body.customerName}'`
      ),
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(function (response) {
      let id = parseInt(response.json.QueryResponse.Customer[0].Id);
      const body = {
        Line: [
          {
            DetailType: "SalesItemLineDetail",
            Amount: req.body.amount,
            Description: req.body.description,
            SalesItemLineDetail: {
              ItemRef: { value: configUtil.getIntuitItemId() }
            }
          }
        ],
        CustomerRef: {
          value: id
        }
      };
      console.log(body);
      oauthClient.makeApiCall({
        url: getBaseUrl() + "/invoice",
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });
    })
    .then(response => {
      console.log("Successfully added invoice");
      res.send(true);
    })
    .catch(e => {
      console.log("Unable to add invoice");
      console.log(e);
      res.send(false);
    })
    .catch(function (e) {
      console.log("Unable to fetch user id with given name");
      res.send(false);
    });
};

exports.createCustomer = async (req, res, next) => {
  if (!getAuthStatus()) {
    res.send(false);
  }
  const body = {
    DisplayName: req.body.firstName + " " + req.body.secondName,
    PrimaryEmailAddr: { Address: req.body.contact.email },
    BillAddr: {
      City: req.body.address.city,
      Line1: req.body.address.street,
      PostalCode: req.body.address.zip,
      CountrySubDivisionCode: req.body.address.state
    },
    PrimaryPhone: { FreeFormNumber: req.body.contact.cellPhone }
  };

  oauthClient
    .makeApiCall({
      url: getBaseUrl() + "/customer",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
    .then(function (response) {
      console.log(response);
      console.log("Successfully able to create quickbooks client");
      next();
    })
    .catch(function (e) {
      console.log("Unable to create quickbooks client");
      console.log(e);
      next();
    });
};

// getInvoices should get all of a customers invoices by using their first and last names as query.
exports.getInvoices = async (req, res) => {
  if (!getAuthStatus()) {
    res.send(false);
  }
  oauthClient
    .makeApiCall({
      url: getQueryURL(
        `select * from Customer Where DisplayName='${req.query.customerName}'`
      ),
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(function (response) {
      let id = parseInt(response.json.QueryResponse.Customer[0].Id);
      console.log(
        getQueryURL(`select * from Invoice Where CustomerRef='${id}'`)
      );
      oauthClient
        .makeApiCall({
          url: getQueryURL(`select * from Invoice Where CustomerRef='${id}'`),
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(function (response) {
          let invoices = response.json.QueryResponse.Invoice;
          res.send({ok: true, data: invoices});
        })
        .catch(function (e) {
          res.send(e);
        });
    })
    .catch(function (e) {
      res.send(e);
    });
};

exports.getInvoicePdf = async (req, res) => {
  if (!getAuthStatus()) {
    res.send(false);
  }
  let accessToken = JSON.parse(authToken).access_token;
  axios({
    url: getBaseUrl() + "/invoice/" + req.query.invoiceId + "/pdf",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/octet-stream"
    },
    responseType: "arraybuffer"
  })
    .then(response => {
      res.contentType("application/pdf;charset=UTF-8");
      res.send(response.data);
    })
    .catch(error => {
      console.log(error);
    });
};

exports.isPaymentOnline = async (req, res) => {
  if (!authToken) {
    console.log("AUTH TOKEN NOT VALID");
    res.send({ ok: true, data: false });
  } else {
    console.log("AUTH TOKEN VALID");
    console.log(getAuthStatus());
    res.send({ ok: true, data: true });
  }
};

exports.callback = async (req, res) => {
  oauthClient
    .createToken(req.url)
    .then(function (authResponse) {
      authToken = JSON.stringify(authResponse.getJson(), null, 2);
      console.log("Successfully obtained auth token");
      console.log(authToken);
    })
    .catch(function (e) {
      console.error(e);
    });
  res.send("");
};

const getAuthStatus = async () => {
  if (!oauthClient) {
    console.log("TOKEN NOT VALID");
    return (false);
  }
  if (oauthClient.isAccessTokenValid()) {
    console.log("TOKEN VALID");
    return (true);
  }
  return await oauthClient
    .refresh()
    .then(function (authResponse) {
      console.log(
        "Updated access token: " + JSON.stringify(authResponse.getJson())
      );
      oauth2_token_json = JSON.stringify(authResponse.getJson(), null, 2);
      return true;
    })
    .catch(function (e) {
      console.error(e);
      return false;
    });
};

const getQueryURL = query => {
  return getBaseUrl() + "/query?query=" + query;
};

const getBaseUrl = () => {
  if (configUtil.getIntuitEnvironment() === "Sandbox") {
    return `https://sandbox-quickbooks.api.intuit.com/v3/company/${configUtil.getIntuitCompany()}`;
  } else {
    return `https://quickbooks.api.intuit.com/v3/company/${configUtil.getIntuitCompany()}`;
  }
};
