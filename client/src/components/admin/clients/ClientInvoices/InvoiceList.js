import React, { useState } from "react";
import { Table } from "semantic-ui-react";
import { getAllInvoices } from "../../../../../src/api/QBApi";

const InvoiceList = (props) => {
  const [listOfInvoices, setInvoiceList] = useState([]);

  const arrayOfInvoices = [];
  //const showInvoiceList = arrayOfInvoices.map()

  return (

  );
};

export default InvoiceList;
