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
                  <ProgBar cases={cases} />
                </Card.Description>
              </div>
            </div>
          </Card.Content>
        </Card>
    );
  } else {
    return <p>Still working on integration for admin dashboard.</p>;
  }
};

export default ProgCard;