import React, { useState } from "react";
import { Accordion, Icon } from "semantic-ui-react";
import ProgCard from "../../../client/ProgBarComponent/ProgCard.js";
import { getCaseById } from "../../../../../src/api/AdminApi";

const ClientCaseList = (props) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [userCaseData, setUserCaseData] = useState(null);
  const [cases, setCases] = useState(false);

  const loadCases = async () => {
    if (props.clientData) {
      const client_Cases = (await getCaseById(props.clientData.cases[0])).data;
      setUserCaseData(client_Cases);
      setCases(true);
    }
  };

  if (!cases) {
    loadCases();
  }

  const toggleActive = (index) => {
    if (index === activeIndex) {
      setActiveIndex(-1);
    } else {
      setActiveIndex(index);
    }
  };

  if (!userCaseData) {
    return <p>Awaiting case data...</p>;
  }
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
        {userCaseData.type}
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 0}>
        <ProgCard case_={userCaseData} />
      </Accordion.Content>
    </Accordion>
  );
};

export default ClientCaseList;
