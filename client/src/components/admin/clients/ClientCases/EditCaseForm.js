import React, { useState } from "react";
import { Modal, Form, Button, Icon, Card, Input } from "semantic-ui-react";
import EditStepCard from "./EditStepCard.js";
import { addCase } from "../../../../../src/api/AdminApi";

const EditCaseForm = props => {
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


  const createNewCase = async () => {
    let addClientResponse = await addCase(
      type,
      startDate,
      caseCompleted,
      caseSteps,
      props.clientData._id,
      null
    );
    console.log(addClientResponse);
    if (addClientResponse.data) {
      alert("Successfully added new client!");
      setOpen(false);
    } else {
      alert("Failed to add case, please try again!");
      console.log("Unable to add client");
    }
  };

  const addToStepArray = () => {
    let temp = caseSteps;
    let stepNumber = caseSteps.length;
    let stepCompleted = false;
    let newStep = {
      stepTitle,
      stepDate,
      stepCompleted,
      stepDescription,
      stepNumber
    }
    temp.push(newStep);
    setCaseSteps(temp);
    console.log(newStep);
  }

  const removeStep = index => {
    let temp = [];
    stepList.forEach(element => {
      temp.push(element);
    });
    if (temp.length > 0) {
      temp.pop();
      setStepList(temp);
    }
  };

  const addStep = () => {
    let temp = [];
    stepList.forEach(element => {
      temp.push(element);
    });
    temp.push(<EditStepCard stepNum={temp.length + 1} toRemove={toRemove}
      setStepDate={setStepDate} setStepTitle={setStepTitle}
      setStepDescription={setStepDescription}
      addToStepArray={addToStepArray}
    />);
    setStepList(temp);
  };

  const clearSteps = () => {
    setStepList([]);
  };

  return (
    <Modal
      trigger={props.triggerButton}
      onClose={() => {
        clearSteps();
      }}
    >
      <Modal.Header>Input Case Information</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field
            control={Input}
            label="Case Title"
            placeholder="Case Title"
            onChange={event => setType(event.target.value)}
          />
          <Form.Field
            control={Input}
            label="Start Date"
            placeholder="mm/dd/year"
            onChange={event => setStartDate(event.target.value)}
          />
          <Form.Field>
            <label>Steps</label>
            <Button
              size="small"
              onClick={() => addStep()}>
              <Icon name="plus" size="small" />
              Add Step
            </Button>
            <Button
              size="small"
              color="red"
              onClick={() => {
                removeStep();
              }}
            >
              <Icon name="minus" size="small" />
              Remove Step
            </Button>
            <p></p>
            <Card.Group>{stepList}</Card.Group>
          </Form.Field>
          <Form.Field>
            <Button
              size="small"
              onClick={() => createNewCase()}
            >
              Add Case
            </Button>
          </Form.Field>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default EditCaseForm;
