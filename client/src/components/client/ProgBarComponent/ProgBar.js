import React, { useState } from "react";
import { Step, Popup } from "semantic-ui-react";

/*
This component takes in an array of case steps that will be retrieved from the database and passed down as props.
It maps each of those case steps to a step component that will be rendered to the user.
*/

const progBar = props => {
  /*
  const progBarItems = props.progBarItems.map(item => {
    if (item.completed) {
      return (
        <Step completed>
          <Step.Content>
            <Step.Title>{item.title}</Step.Title>
          </Step.Content>
        </Step>
      );
    } else if (item.active) {
      return (
        <Step active>
          <Step.Content>
            <Step.Title>{item.title}</Step.Title>
          </Step.Content>
        </Step>
      );
    } else {
      return (
        <Step disabled>
          <Step.Content>
            <Step.Title>{item.title}</Step.Title>
          </Step.Content>
        </Step>
      );
    }
  });
  */

  return (
    <Step.Group size="small" ordered>
      <Popup
        positionFixed
        content="I am positioned to the top center"
        position="top center"
        trigger={
          <Step completed>
            <Step.Content>
              <Step.Title>First step</Step.Title>
            </Step.Content>
          </Step>
        }
      />

      <Step active>
        <Step.Content>
          <Step.Title>Second step</Step.Title>
        </Step.Content>
      </Step>
      <Step disabled>
        <Step.Content>
          <Step.Title>Third step</Step.Title>
        </Step.Content>
      </Step>
    </Step.Group>
  );
};

export default progBar;
