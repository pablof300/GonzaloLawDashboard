import React, { useState } from "react";
import { Form, Card, Input, Button } from "semantic-ui-react";

const EditStepCard = props => {
  const [stepNum, setStepNum] = useState(props.stepNum);
  return (
    <Card>
      <Card.Content>
        <Card.Header>Step #{stepNum}</Card.Header>
        <Form.Field
          control = {Input}
          labe = "Title"
          placeholder="Title"
          onChange={event => props.setStepTitle(event.target.value)}
          />
        <Form.Field
          control = {Input}
          label = "Date"
          placeholder="Date"
          onChange={event => props.setStepDate(event.target.value)}
        />
        <Form.TextArea 
        label="Description"
        placeholder="Description"
        onChange={event => props.setStepDescription(event.target.value)}
        />
      </Card.Content>
      <Button
          size="small"
          onClick={() => props.addToStepArray()}>
          Add Step 
        </Button>
    </Card>
  );
};

export default EditStepCard;
