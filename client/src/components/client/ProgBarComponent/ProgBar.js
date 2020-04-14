import React, { useState } from "react";
import { Step, Popup } from "semantic-ui-react";

const ProgBar = (props) => {
  if (props.case_ !== undefined && props.case_.length !== 0) {
    const displayedCase = props.case_;

    let activeStepSeen = false;
    const steps = displayedCase.steps.map(function (curStep) {
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
      <Step.Group ordered size="small">
        {steps}
      </Step.Group>
    );
  } else {
    return <p>No cases for current client.</p>;
  }
};

export default ProgBar;
