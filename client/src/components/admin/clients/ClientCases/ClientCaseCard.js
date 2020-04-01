import React from "react";
import { Card, Button, Icon } from "semantic-ui-react";
import ClientCaseList from "./ClientCaseList.js";
import EditCaseForm from "./EditCaseForm.js";
import { props } from "bluebird";

const ClientCaseCard = (props) => {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          Cases
          <EditCaseForm
            clientData = {props.clientData}
            triggerButton={
              <Button size="small" floated="right">
                <Icon name="plus" size="small" />
                Add Case
              </Button>
            }
          />
        </Card.Header>
        <ClientCaseList 
        clientData = {props.clientData}
        />
      </Card.Content>
    </Card>
  );
};

export default ClientCaseCard;
