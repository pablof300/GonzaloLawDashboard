import React from "react";
import { Card, Button, Icon } from "semantic-ui-react";
import EditInvoiceForm from "./EditInvoiceForm.js";

const InvoiceCard = (props) => {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          Invoices
          <EditInvoiceForm
            clientData = {props.clientData}
            triggerButton={
              <Button size="small" floated="right">
                <Icon name="plus" size="small" />
                Add Invoice
              </Button>
            }
          />
        </Card.Header>
      </Card.Content>
    </Card>
  );
};

export default InvoiceCard;
