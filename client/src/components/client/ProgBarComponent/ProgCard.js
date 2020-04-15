import React from "react";
import { Card } from "semantic-ui-react";
import ProgBar from "./ProgBar.js";

const ProgCard = (props) => {
  const case_ = props.case_;

  return (
    <Card fluid>
      <Card.Content style={{ overflow: "auto" }}>
        <Card.Header
          style={{ backgroundColor: "transparent" }}
          textAlign={"center"}
        >
          Case Progress
        </Card.Header>
        <div class="ui grid">
          <div class="centered row">
            <Card.Description>
              <ProgBar case_={case_} />
            </Card.Description>
          </div>
        </div>
      </Card.Content>
    </Card>
  );
};

export default ProgCard;
