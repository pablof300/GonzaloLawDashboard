import React, { useState } from "react";
import { Accordion, Icon } from "semantic-ui-react";
import ProgCard from "../../../client/ProgBarComponent/ProgCard.js";
import { getCaseById } from "../../../../../src/api/AdminApi";


const ClientCaseList = props => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [userCaseData, setUserCaseData] = useState([]);
  const [cases, setCases] = useState(false);


  const loadCases = async () => {
    
    if (props.clientData)
      {
      const client_Cases = (await getCaseById(props.clientData.cases[0])).data;
      setUserCaseData(client_Cases);
      setCases(true);
    }
  };

  if (!cases) {
    loadCases();
  }
  const toggleActive = index => {
    if (index === activeIndex) {
      setActiveIndex(-1);
    } else {
      setActiveIndex(index);
    }
  };
  
   

  //restructure to return list of accordion components that is matched to each case
  return (
    <Accordion>
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
        <ProgCard />
      </Accordion.Content>
    </Accordion>
  );
};

export default ClientCaseList;
