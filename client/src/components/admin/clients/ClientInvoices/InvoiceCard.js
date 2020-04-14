import React from "react";
import { Card, Button, Icon, Table } from "semantic-ui-react";
import EditInvoiceForm from "./EditInvoiceForm.js";
import InvoiceList from "./InvoiceList.js";
import { getAllInvoices } from "../../../../../src/api/QBApi";

const InvoiceCard = (props) => {
  // const getOurInvoices = async () => {
  //   console.log(props.clientName);
  //   let invoiceResponse = await getAllInvoices(props.clientName);
  // }

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          Invoices
          <Button size="small" floated="right">
            <Icon name="sync alternate" size="small" />
            Refresh Invoice List
          </Button>
          <EditInvoiceForm
            clientData = {props.clientData}
            triggerButton={
              <Button size="small" floated="right">
                <Icon name="plus" size="small" />
                Add Invoice
              </Button>}
          />
        </Card.Header>
      </Card.Content>
      <Card.Content>
        <Table singleLine compact>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Date Created</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Balance Due</Table.HeaderCell>
              <Table.HeaderCell>Total</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <InvoiceList clientData={props.clientData} clientName={props.clientName}/>
        </Table>
      </Card.Content>
    </Card>
  );
};

export default InvoiceCard;
