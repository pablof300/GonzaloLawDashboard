import React, { useState } from "react";
import { Form, Card } from "semantic-ui-react";

const EditStepCard = props => {
  const [stepNum, setStepNum] = useState(props.stepNum);

  return (
    <Card>
      <Card.Content>
        <Card.Header>Step #{stepNum}</Card.Header>
        <Form.Field>
          <label>Title</label>
          <input placeholder="Title" />
        </Form.Field>
        <Form.Field>
          <label>Date</label>
          <input placeholder="Date" />
        </Form.Field>
        <Form.TextArea label="Description" placeholder="Description" />
      </Card.Content>
    </Card>
  );
};

export default EditStepCard;
