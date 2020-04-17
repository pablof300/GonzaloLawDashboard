import React from "react";
import { Card, Button, Icon, Segment } from "semantic-ui-react";
import ClientCaseList from "./ClientCaseList.js";
import EditCaseForm from "./EditCaseForm.js";

const ClientCaseCard = (props) => {
  return (
    <Card fluid>
      <Segment style={{ overflow: "auto", maxHeight: 300 }}>
        <Card.Content>
          <Card.Header>
            Cases
            <EditCaseForm
              clientData={props.clientData}
              triggerButtonText={"Add Case"}
              triggerButton={
                <Button size="small" floated="right">
                  <Icon name="plus" size="small" />
                  Add Case
                </Button>
              }
            />
          </Card.Header>
          <ClientCaseList clientData={props.clientData} />
        </Card.Content>
      </Segment>
    </Card>
  );
};

export default ClientCaseCard;
