import React, { useState } from "react";
import { Modal, Form, Button, Icon, Card, Input } from "semantic-ui-react";

const EditInvoiceForm = props => {
  const [stepList, setStepList] = useState([]);
  const [toRemove, setToRemove] = useState(-1);
  const [type, setType] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [caseCompleted, setCaseCompleted] = useState(false);
  const [caseSteps, setCaseSteps] = useState([]);
  const [stepTitle, setStepTitle] = useState(null);
  const [stepDate, setStepDate] = useState(null);
  const [stepDescription, setStepDescription] = useState(null);
  const [open, setOpen] = useState(false);

  return (
    <Modal trigger={props.triggerButton}>
      <Modal.Header>Input Invoice Details</Modal.Header>
      <Modal.Content>
        <Form>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default EditInvoiceForm
