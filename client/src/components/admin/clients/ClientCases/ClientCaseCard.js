import React from "react";
import { Card, Button, Icon } from "semantic-ui-react";
import ClientCaseList from "./ClientCaseList.js";
import EditCaseForm from "./EditCaseForm.js";

const ClientCaseCard = () => {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          Cases
          <EditCaseForm
            triggerButton={
              <Button size="small" floated="right">
                <Icon name="plus" size="small" />
                Add Case
              </Button>
            }
          />
        </Card.Header>
        <ClientCaseList />
      </Card.Content>
    </Card>
  );
};

export default ClientCaseCard;