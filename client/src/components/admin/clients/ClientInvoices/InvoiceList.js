import React, { useState } from "react";
import { Table } from "semantic-ui-react";
import { getAllInvoices } from "../../../../../src/api/QBApi";

const InvoiceList = (props) => {
  const [listOfInvoices, setInvoiceList] = useState([]);
  const [invoicesLoaded, setInvoicesLoaded] = useState(false);

  const loadInvoices = async () => {
    let invoiceResponse = await getAllInvoices(props.clientName);

    // checks if the invoice data is null or not.
    if(invoiceResponse.data) {
      setInvoiceList(invoiceResponse.data);
      setInvoicesLoaded(true);
    }
  };

  if(!invoicesLoaded) {
    loadInvoices();
  }

  const showInvoiceList = listOfInvoices.map(invoice => {
      return (
        <Table.Row>
          <Table.Cell>{invoice.TxnDate}</Table.Cell>
          <Table.Cell>{invoice.Line[0].Description}</Table.Cell>
          <Table.Cell>${invoice.Balance}</Table.Cell>
          <Table.Cell>${invoice.TotalAmt}</Table.Cell>
        </Table.Row>
      );
  });

  return (
    <Table.Body>
       {showInvoiceList}
    </Table.Body>
  );
};

export default InvoiceList;
