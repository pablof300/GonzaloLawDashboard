import React, { useState } from "react";
import { Form, Card, Input, Button } from "semantic-ui-react";

const EditStepCard = (props) => {
  const [stepTitle, setStepTitle] = useState(props.step);
  const [stepDate, setStepDate] = useState(props.date);
  const [stepDescription, setStepDescription] = useState(props.stepDescription);

  const updateStep = () => {
    console.log({
      step: stepTitle,
      date: stepDate,
      completed: props.completed,
      stepDescription: stepDescription,
      stepNumber: props.stepNumber,
    });
    props.updateStep({
      step: stepTitle,
      date: stepDate,
      completed: props.completed,
      stepDescription: stepDescription,
      stepNumber: props.stepNumber,
    });
  };

  const clearStep = () => {
    setStepTitle("");
    setStepDate("");
    setStepDescription("");
  };

  return (
    <Card>
      <Card.Content>
        <Card.Header>Step #{props.stepNumber}</Card.Header>
        <Form.Field
          control={Input}
          label="Title"
          value={stepTitle}
          onChange={(event) => {
            setStepTitle(event.target.value);
            updateStep();
          }}
        />
        <Form.Field
          control={Input}
          label="Date"
          value={stepDate}
          onChange={(event) => {
            setStepDate(event.target.value);
            updateStep();
          }}
        />
        <Form.TextArea
          label="Description"
          value={props.description}
          onChange={(event) => {
            setStepDescription(event.target.value);
            updateStep();
          }}
        />
      </Card.Content>
      <Button
        size="small"
        negative
        onClick={() => {
          clearStep();
          props.removeStep(parseInt(props.stepNumber));
        }}
      >
        Delete Step
      </Button>
    </Card>
  );
};

export default EditStepCard;
