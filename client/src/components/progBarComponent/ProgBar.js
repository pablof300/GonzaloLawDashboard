import React, { useState } from "react";
import { Step } from "semantic-ui-react";

const progBar = props => {
  /*
  return (
    <Step.Group style={{ overflow: "auto" }} size="small" ordered>
      <Step completed>
        <Step.Content>
          <Step.Title>lorum ipsum</Step.Title>
        </Step.Content>
      </Step>
      <Step active>
        <Step.Content>
          <Step.Title>sumas clos</Step.Title>
        </Step.Content>
      </Step>
      <Step disabled>
        <Step.Content>
          <Step.Title>froman loman</Step.Title>
        </Step.Content>
      </Step>
    </Step.Group>
  );
  */

  const bar = props.cases.map(function(element) {
    <Step>
      <Step.Content>
        <Step.Title>element.</Step.Title>
      </Step.Content>
    </Step>;
  });

  return (
    <Step.Group style={{ overflow: "auto" }} size="small" ordered>
      {bar}
    </Step.Group>
  );
};

export default progBar;
