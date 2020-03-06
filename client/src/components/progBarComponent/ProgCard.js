import React from "react";
import { Card } from "semantic-ui-react";
import ProgBar from "./ProgBar.js";
import Dropdown from "./Dropdown.js";
//allow it to change dynamically
//use icons
//style component
//always make spacing relative

/*
- need to see case
- which state it's in
*/
const ProgCard = () => {
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
              <ProgBar />
            </Card.Description>
          </div>
          <div class="centered row">
            <Card.Description textAlign={"left"}>
              <Dropdown />
            </Card.Description>
          </div>
        </div>
      </Card.Content>
    </Card>
  );
};

export default ProgCard;
