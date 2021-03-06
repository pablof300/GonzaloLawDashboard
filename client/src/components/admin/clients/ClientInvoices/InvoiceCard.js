import React from "react";
import { Card, Button, Icon, Table } from "semantic-ui-react";
import EditInvoiceForm from "./EditInvoiceForm.js";
import InvoiceList from "./InvoiceList.js";
import { getAllInvoices } from "../../../../../src/api/QBApi";

const InvoiceCard = (props) => {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          Invoices
          <EditInvoiceForm
            clientData = {props.clientData}
            clientName = {props.clientName}
          />
        </Card.Header>
      </Card.Content>
      <Card.Content>
        <Table compact>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Date Created</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Balance Due</Table.HeaderCell>
              <Table.HeaderCell>Total</Table.HeaderCell>
              <Table.HeaderCell>PDF</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <InvoiceList clientData={props.clientData} clientName={props.clientName}/>
        </Table>
      </Card.Content>
    </Card>
  );
};

export default InvoiceCard;
