import React from "react";
import { Card, Button, Icon, Table } from "semantic-ui-react";
import InvoiceList from "../../admin/clients/ClientInvoices/InvoiceList.js";
import { getURL, getAllInvoices, checkURLStatus } from "../../../../src/api/QBApi";

const ClientInvoiceCard = (props) => {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          Invoices
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
              <Table.HeaderCell>PDF</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <InvoiceList clientData={props.clientData} clientName={props.clientName}/>
        </Table>
      </Card.Content>
    </Card>
  );
};

export default ClientInvoiceCard;
