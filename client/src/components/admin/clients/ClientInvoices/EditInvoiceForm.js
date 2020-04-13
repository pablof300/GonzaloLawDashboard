import React, { useState } from "react";
import { Modal, Form, Button, Icon, Card, Input } from "semantic-ui-react";

const EditInvoiceForm = props => {
  const [invoiceDesc, setInvDesc] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <Modal trigger={props.triggerButton}>
      <Modal.Header>Input Invoice Details</Modal.Header>
      <Modal.Content>
        <Form>
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
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default EditInvoiceForm
