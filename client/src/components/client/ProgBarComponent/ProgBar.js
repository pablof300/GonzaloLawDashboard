import React, { useState } from "react";
import { Step, Popup } from "semantic-ui-react";
import { getCurrentUser } from "../../../../src/api/UserApi";

const ProgBar = props => {
  if (props.cases !== undefined && props.cases.length !== 0) {
    const displayedCase = props.cases[0];

    let activeStepSeen = false;
    const steps = displayedCase.steps.map(function(curStep) {
      if (curStep.completed === false && activeStepSeen === false) {
        activeStepSeen = true;
        return (
          <Popup
            trigger={
              <Step active={true}>
                <Step.Content>
                  <Step.Title>{curStep.step}</Step.Title>
                </Step.Content>
              </Step>
            }
            position="top center"
            positionFixed
          >
            <Popup.Header>{curStep.stepDescription}</Popup.Header>
          </Popup>
        );
      } else if (curStep.completed === false && activeStepSeen === true) {
        return (
          <Popup
            trigger={
              <Step disabled={true}>
                <Step.Content>
                  <Step.Title>{curStep.step}</Step.Title>
                </Step.Content>
              </Step>
            }
            position="top center"
            positionFixed
          >
            <Popup.Header>{curStep.stepDescription}</Popup.Header>
          </Popup>
        );
      } else {
        return (
          <Popup
            trigger={
              <Step completed={true}>
                <Step.Content>
                  <Step.Title>{curStep.step}</Step.Title>
                </Step.Content>
              </Step>
            }
            position="top center"
            positionFixed
          >
            <Popup.Header>{curStep.stepDescription}</Popup.Header>
          </Popup>
        );
      }
    });

    return (
      <Step.Group size="small" ordered>
        {steps}
      </Step.Group>
    );
  } else if (props.case !== undefined) {
    let activeStepSeen = false;
    const steps = props.case.steps.map(function(curStep) {
      if (curStep.completed === false && activeStepSeen === false) {
        activeStepSeen = true;
        return (
          <Popup
            trigger={
              <Step active={true}>
                <Step.Content>
                  <Step.Title>{curStep.step}</Step.Title>
                </Step.Content>
              </Step>
            }
            position="top center"
            positionFixed
          >
            <Popup.Header>{curStep.stepDescription}</Popup.Header>
          </Popup>
        );
      } else if (curStep.completed === false && activeStepSeen === true) {
        return (
          <Popup
            trigger={
              <Step disabled={true}>
                <Step.Content>
                  <Step.Title>{curStep.step}</Step.Title>
                </Step.Content>
              </Step>
            }
            position="top center"
            positionFixed
          >
            <Popup.Header>{curStep.stepDescription}</Popup.Header>
          </Popup>
        );
      } else {
        return (
          <Popup
            trigger={
              <Step completed={true}>
                <Step.Content>
                  <Step.Title>{curStep.step}</Step.Title>
                </Step.Content>
              </Step>
            }
            position="top center"
            positionFixed
          >
            <Popup.Header>{curStep.stepDescription}</Popup.Header>
          </Popup>
        );
      }
    });

    return (
      <Step.Group size="small" ordered>
        {steps}
      </Step.Group>
    );
  } else {
    return <p>No cases for current client.</p>;
  }
};

export default ProgBar;
