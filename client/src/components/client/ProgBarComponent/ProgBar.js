import React, { useState } from "react";
import { Step, Popup } from "semantic-ui-react";
import { getCurrentUser } from "../../../../src/api/UserApi";

/*
This component takes in an array of case steps that will be retrieved from the database and passed down as props.
It maps each of those case steps to a step component that will be rendered to the user.
*/

const ProgBar = props => {
  const [userData, setUserData] = useState([]);
  const [isUserLoaded, setIsUserLoaded] = useState(false);

  const loadUserData = async () => {
    const user = (await getCurrentUser()).data;
    setUserData(user);
    setIsUserLoaded(true);
  };
  if (!isUserLoaded) {
    loadUserData();
  }

  return (
    <Step.Group size="small" ordered>
      <Popup
        positionFixed
        content="I am positioned to the top center"
        position="top center"
        trigger={
          <Step completed>
            <Step.Content>
              <Step.Title>First Step</Step.Title>
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

  //get id for current user
  const id = Cookies.get("jwt");

  //pass id into case API to get all cases for that user
  const cases = ["1", "2"]; //replace this with a default to 0th indexed casein db

  const bar = cases.map(function(element) {
    //check if step has been completed before returning it
    return (
      <Popup
        trigger={
          <Step>
            <Step.Content>
              <Step.Title>Step Title</Step.Title>
            </Step.Content>
          </Step>
        }
        position="top center"
      >
        <Popup.Header>Step Description</Popup.Header>
      </Popup>
    );
  });

  return (
    <Step.Group size="small" ordered>
      {bar}
    </Step.Group>
  );
};

export default ProgBar;
