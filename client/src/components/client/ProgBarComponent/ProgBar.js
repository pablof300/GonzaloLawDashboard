import React, { useState } from "react";
import { Step } from "semantic-ui-react";

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
  const cases = ["1", "2", "3", "4"];

  const bar = cases.map(function(element) {
    //check if step has been completed before returning it
    return (
      <Step>
        <Step.Content>
          <Step.Title>element.</Step.Title>
        </Step.Content>
      </Step>
    );
  });

  return (
    <Step.Group style={{ overflow: "auto" }} size="small" ordered>
      {bar}
    </Step.Group>
  );
};

export default progBar;
