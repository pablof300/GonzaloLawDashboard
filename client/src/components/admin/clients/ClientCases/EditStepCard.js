import React, { useState, useEffect } from "react";
import { Form, Card, Input, Button, Radio } from "semantic-ui-react";

const EditStepCard = (props) => {
  const [stepTitle, setStepTitle] = useState(props.step);
  const [stepDate, setStepDate] = useState(props.date);
  const [stepDescription, setStepDescription] = useState(props.stepDescription);
  const [completed, setCompleted] = useState(props.completed);

  useEffect(() => {
    props.updateStep({
      step: stepTitle,
      date: stepDate,
      completed: completed,
      stepDescription: stepDescription,
      stepNumber: props.stepNumber,
    });
  });

  const clearStep = () => {
    setStepTitle(props.step);
    setStepDate(props.date);
    setStepDescription(props.stepDescription);
    setCompleted(props.completed);
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
          }}
        />
        <Form.Field
          control={Input}
          label="Date"
          value={stepDate}
          onChange={(event) => {
            setStepDate(event.target.value);
          }}
        />
        <Form.TextArea
          label="Description"
          value={stepDescription}
          onChange={(event) => {
            setStepDescription(event.target.value);
          }}
        />
        <Radio
          toggle
          label="Completed"
          defaultChecked={completed}
          onClick={() => {
            setCompleted(!completed);
          }}
        />
      </Card.Content>
    </Card>
  );
};

export default EditStepCard;
