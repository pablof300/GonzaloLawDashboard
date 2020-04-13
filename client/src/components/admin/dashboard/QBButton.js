import React, { useState, useEffect } from "react";
import {Grid, Container, Header, Icon, Card, Button} from "semantic-ui-react";
import { getURL, checkURLStatus } from "../../../../src/api/QBApi";

const QBStatus = props => {
  const [status, setStatus] = useState("Offline");

  const startOAuth = async () => {
    let oAuthResponse = await getURL();
    var win = window.open(oAuthResponse.data, '_blank');   win.focus();

    let urlStatus = await checkURLStatus();
    if(urlStatus)
    {
      setStatus("Online");
    }
  };

  return (
  <Card>
    <Card.Content>
      <Card.Content> Connect to Quickbooks </Card.Content>
    </Card.Content>
    <Card.Content extra>
      <a> Status: {status} </a>
      <Button
        compact
        floated="right"
        size="tiny"
        onClick={() => startOAuth()}>
        Connect
      </Button>
    </Card.Content>
  </Card>
  );
};

export default QBStatus;
