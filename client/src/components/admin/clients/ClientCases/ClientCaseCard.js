import React from "react";
import { Card, Segment } from "semantic-ui-react";
import ClientCaseList from "./ClientCaseList.js";
import EditCaseForm from "./EditCaseForm.js";

const ClientCaseCard = (props) => {
  let editCaseFormOpen = false;
  return (
    <Card fluid>
      <Segment style={{ overflow: "auto", maxHeight: 300 }}>
        <Card.Content>
          <Card.Header>
            Cases
            <EditCaseForm
              clientData={props.clientData}
              triggerButtonText={"Add Case"}
            />
          </Card.Header>
          <ClientCaseList clientData={props.clientData} />
        </Card.Content>
      </Segment>
    </Card>
  );
};

export default ClientCaseCard;
