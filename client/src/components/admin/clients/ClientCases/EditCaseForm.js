import React, { useState } from "react";
import { Modal, Form, Button, Icon, Card, Input } from "semantic-ui-react";
import EditStepCard from "./EditStepCard.js";
import { addCase } from "../../../../../src/api/AdminApi";

const EditCaseForm = (props) => {
  //case
  const [type, setType] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [caseCompleted, setCaseCompleted] = useState(false);
  const [open, setOpen] = useState(false);
  //steps
  const [stepDict, setStepDict] = useState([]);
  const [stepCount, setStepCount] = useState(0);

  const createNewCase = async () => {
    let addCaseResponse = await addCase(
      type,
      startDate,
      caseCompleted,
      getStepArray(),
      props.clientData._id,
      null
    );
    if (addCaseResponse.data) {
      alert("Successfully added new case!");
      props.addClientCallback(addCaseResponse.data);
      setOpen(false);
    } else {
      alert("Failed to add case, please try again!");
      console.log("Unable to add case");
    }
  };

  const getStepArray = () => {
    let stepArray = [];
    for (let i = 1; i <= stepCount; i++) {
      const curStep = stepDict[i.toString()];
      stepArray.push(curStep);
    }
    return stepArray;
  };

  //addStep
  const addStep = () => {
    let newStep = {
      step: "",
      date: "",
      completed: false,
      stepDescription: "",
      stepNumber: (stepCount + 1).toString(),
    };
    let newStepDict = stepDict;
    newStepDict[newStep.stepNumber] = newStep;
    setStepDict(newStepDict);
    setStepCount(stepCount + 1);
  };

  //updateStep
  const updateStep = (updatedStep) => {
    let newStepDict = stepDict;
    newStepDict[updatedStep.stepNumber] = updatedStep;
    setStepDict(newStepDict);
  };

  //removeStep
  const removeStep = (stepNumber) => {
    let newStepDict = stepDict;
    console.log(newStepDict[stepNumber.toString()]);
    delete newStepDict[stepNumber.toString()];
    for (let i = stepNumber; i < stepCount; i++) {
      let curStep = newStepDict[(i + 1).toString()];
      curStep.stepNumber = i.toString();
      newStepDict[i.toString()] = curStep;
    }
    delete newStepDict[stepCount.toString()];
    setStepDict(newStepDict);
    setStepCount(stepCount - 1);
  };

  const clearSteps = () => {
    setStepDict([]);
  };

  const getStepCards = () => {
    let stepCards = [];
    for (let i = 0; i < stepCount; i++) {
      const curStep = stepDict[(i + 1).toString()];
      stepCards.push(
        <EditStepCard
          step={curStep.step}
          date={curStep.date}
          completed={curStep.completed}
          stepDescription={curStep.stepDescription}
          stepNumber={curStep.stepNumber}
          updateStep={updateStep}
          removeStep={removeStep}
        />
      );
    }
    return stepCards;
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
            onChange={(event) => setType(event.target.value)}
          />
          <Form.Field
            control={Input}
            label="Start Date"
            placeholder="mm/dd/year"
            onChange={(event) => setStartDate(event.target.value)}
          />
          <Form.Field>
            <label>Steps</label>
            <Button size="small" onClick={() => addStep()}>
              <Icon name="plus" size="small" />
              Add Step
            </Button>
            <p></p>
            <Card.Group>{getStepCards()}</Card.Group>
          </Form.Field>
          <Form.Field>
            <Button size="small" onClick={() => createNewCase()}>
              Add Case
            </Button>
          </Form.Field>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default EditCaseForm;
