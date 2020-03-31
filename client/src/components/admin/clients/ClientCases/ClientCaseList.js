import React, { useState } from "react";
import { Accordion, Icon } from "semantic-ui-react";
import ProgCard from "../../../client/ProgBarComponent/ProgCard.js";

const ClientCaseList = props => {
  const [activeIndex, setActiveIndex] = useState(-1);

  const toggleActive = index => {
    if (index === activeIndex) {
      setActiveIndex(-1);
    } else {
      setActiveIndex(index);
    }
  };

  //restructure to return list of accordion components that is matched to each case
  //use mapping function or something similar
  return (
    <Accordion>
      {
        //=========================
      }
      <Accordion.Title
        active={activeIndex === 0}
        onClick={() => {
          toggleActive(0);
        }}
      >
        <Icon name="dropdown" />
        Case Title Here
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 0}>
        <ProgCard />
      </Accordion.Content>
      {
        //=========================
      }
      <Accordion.Title
        active={activeIndex === 1}
        onClick={() => {
          toggleActive(1);
        }}
      >
        <Icon name="dropdown" />
        Case Title Here
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 1}>
        <ProgCard />
      </Accordion.Content>
      {
        //=========================
      }
    </Accordion>
  );
};

export default ClientCaseList;
