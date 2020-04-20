import React, { useState } from "react";
import { Table, Icon, Button } from "semantic-ui-react";
import { getAllInvoices, getInvoicePdf } from "../../../../../src/api/QBApi";

const InvoiceList = (props) => {
  const [listOfInvoices, setInvoiceList] = useState([]);
  const [invoicesLoaded, setInvoicesLoaded] = useState(false);

  const callAPIGetPDF = async (invoiceId) => {
    let pdfResponse = await getInvoicePdf(invoiceId);
    // this lets us get the correct array from the response, which is Uint8Array
    var uint8View = new Uint8Array(pdfResponse);
    var blob = new Blob([uint8View], {type: "application/pdf"});
    var link = document.createElement('a');
    var fileName = invoiceId + "_" + props.clientData.firstName + "_" + props.clientData.secondName;
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  }

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
        <Table.Cell>
          <Button compact size="tiny" onClick={() => callAPIGetPDF(invoice.Id)}>
            <Button.Content>
              <Icon name="file pdf" />
            </Button.Content>
          </Button>
        </Table.Cell>
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
