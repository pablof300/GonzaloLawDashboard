import React, { useState } from "react";
import { Step, Popup } from "semantic-ui-react";
import { getCurrentUser} from "../../../../src/api/UserApi";

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
    <Step.Group  size="small" ordered>
    <Popup positionFixed
        content='I am positioned to the top center' position='top center' trigger={
       <Step completed>
        <Step.Content>
          <Step.Title>First Step</Step.Title>
        </Step.Content>
      </Step>
    }/>
     
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

export default ProgBar;
