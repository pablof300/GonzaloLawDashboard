import React, { useState } from "react";
import { Modal, Form, Button, Icon, Card, Input } from "semantic-ui-react";
import { createAnInvoice } from "../../../../../src/api/QBApi";

const EditInvoiceForm = (props) => {
  const [invoiceDesc, setInvDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [open, setOpen] = useState(false);

  const addNewInvoice = async () => {
    // this should return true.
    let createInvoiceResponse = await createAnInvoice(props.clientName, invoiceDesc, amount);
    if(createInvoiceResponse) {
      alert("Invoice has been added to " + props.clientName + "!");
    }
    else {
      alert("Adding the invoice failed, please make sure all fields were filled.");
    }
  }

  return (
  <Modal
  open={open}
  trigger={
    <Button size="small" floated="right" onClick={() => setOpen(true)}>
      <Icon name="plus" size="small" />
      Add Invoice
    </Button>
  }>
    <Modal.Header>Input Invoice Details</Modal.Header>
    <Modal.Content>
      <Form>
        <Form.Group>
          <Form.Field
          control={Input}
          label="Invoice Description"
          placeholder="Invoice Description"
          onChange={event => setInvDesc(event.target.value)}
          />
          <Form.Field
          control={Input}
          label="Amount"
          placeholder="Amount"
          onChange={event => setAmount(event.target.value)}
          />
        </Form.Group>
        <Button onClick={() => addNewInvoice()}>Create Invoice</Button>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
      </Form>
    </Modal.Content>
  </Modal>
  );
};

export default EditInvoiceForm
