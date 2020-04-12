import React, { useState } from "react";
import { Modal, Form, Button, Icon, Card } from "semantic-ui-react";
import EditStepCard from "./EditStepCard.js";

const EditCaseForm = props => {
  const [stepList, setStepList] = useState([]);
  const [toRemove, setToRemove] = useState(-1);

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
    temp.push(<EditStepCard stepNum={temp.length + 1} toRemove={toRemove} />);
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
          <Form.Field>
            <label>Case Title</label>
            <input placeholder="Case Title" />
          </Form.Field>
          <Form.Field>
            <label>Start Date</label>
            <input placeholder="mm/dd/year" />
          </Form.Field>
          <Form.Field>
            <label>Steps</label>
            <Button
              size="small"
              onClick={() => {
                addStep();
              }}
            >
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
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default EditCaseForm;
