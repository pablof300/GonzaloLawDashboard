import React, { useState } from "react";
import { Accordion, Icon } from "semantic-ui-react";

const Dropdown = () => {
  const [isActive, setActive] = useState(false);

  const toggleActive = () => {
    setActive(!isActive);
  };

  return (
    <Accordion styled>
      <Accordion.Title active={isActive} onClick={toggleActive}>
        <Icon name={"dropdown"} />
        More info...
      </Accordion.Title>
      <Accordion.Content active={isActive}>
        Case info will be retrieved from database and displayed here.
      </Accordion.Content>
    </Accordion>
  );
};

export default Dropdown;
