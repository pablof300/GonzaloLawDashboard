import React, { useState } from "react";
import { Popup, Step } from "semantic-ui-react";

const progBar = props => {
  /*
  return (
    <Step.Group style={{ overflow: "auto" }} size="small" ordered>
      <Step completed>
        <Step.Content>
          <Step.Title>First step</Step.Title>
        </Step.Content>
      </Step>
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
  */

  //get id for current user
  //const id = Cookies.get("jwt");

  //pass id into case API to get all cases for that user
  const cases = ["1", "2"];

  const bar = cases.map(function(element) {
    //check if step has been completed before returning it
    return (
      <Popup
        trigger={
          <Step>
            <Step.Content>
              <Step.Title>element.</Step.Title>
            </Step.Content>
          </Step>
        }
        position="top center"
      >
        <Popup.Header>More Info</Popup.Header>
      </Popup>
    );
  });

  return (
    <Step.Group size="small" ordered>
      {bar}
    </Step.Group>
  );
};

export default progBar;
