import React, { useState, useEffect } from "react";
import {Grid, Container, Header, Icon, Card, Button} from "semantic-ui-react";
import { getURL } from "../../../../src/api/QBApi";

const QBStatus = props => {

  const startOAuth = async () => {
    console.log("oauth hahaha");
    let oAuthResponse = await getURL();
    console.log("hahaha oauth");
  };

  return (
  <Card>
    <Card.Content>
      <Card.Content> Connect to Quickbooks </Card.Content>
    </Card.Content>
    <Card.Content extra>
      <a> Status: Offline </a>
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
