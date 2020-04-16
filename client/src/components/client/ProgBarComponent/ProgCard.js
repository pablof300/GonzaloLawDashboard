import React, { useState } from "react";
import { Card } from "semantic-ui-react";
import ProgBar from "./ProgBar.js";
import { getCurrentUser } from "../../../../src/api/UserApi";

const ProgCard = props => {
  const [userData, setUserData] = useState([]);
  const [isUserLoaded, setIsUserLoaded] = useState(false);

  if (props.isClient === true) {
    const loadUserData = async () => {
      const user = (await getCurrentUser()).data;
      setUserData(user);
      setIsUserLoaded(true);
    };
    if (!isUserLoaded) {
      loadUserData();
    }

    const cases = userData.cases;
    return (
      <Card fluid>
        <Card.Content  style={{ overflow: "auto" }}>
          <Card.Header
            style={{ backgroundColor: "transparent" }}
            textAlign={"center"}
          >
            Case Progress
          </Card.Header>
          <div class="ui grid">
            <div class="centered row">
              <Card.Description>
                <ProgBar cases={props.userCase} />
              </Card.Description>
            </div>
          </div>
        </Card.Content>
      </Card>
    );
  } else {
    //if user is admin
    console.log(props.case);
    return (
      <Card fluid>
        <Card.Content>
          <Card.Header
            style={{ backgroundColor: "transparent" }}
            textAlign={"center"}
          >
            Case Progress
          </Card.Header>
          <div class="ui grid">
            <div class="centered row">
              <Card.Description>
                <ProgBar case={props.case} />
              </Card.Description>
            </div>
          </div>
        </Card.Content>
      </Card>
    );
  }
};

export default ProgCard;
