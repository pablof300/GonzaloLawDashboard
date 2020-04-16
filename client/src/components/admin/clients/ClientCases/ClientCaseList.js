/*
import React, { useState } from "react";
import { Accordion, Icon } from "semantic-ui-react";
import ProgCard from "../../../client/ProgBarComponent/ProgCard.js";
import { getCaseById } from "../../../../../src/api/AdminApi";

const ClientCaseList = props => {
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

  const toggleActive = index => {
    if (index === activeIndex) {
      setActiveIndex(-1);
    } else {
      setActiveIndex(index);
    }
  };
  if (!userCaseData) {
    return <div></div>;
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
        <ProgCard case={userCaseData} />
      </Accordion.Content>
    </Accordion>
  );
};

export default ClientCaseList;
*/

import React, { useState } from "react";
import { Accordion, Icon, Button } from "semantic-ui-react";
import ProgCard from "../../../client/ProgBarComponent/ProgCard.js";
import { getCaseById } from "../../../../../src/api/AdminApi";
import EditCaseForm from "./EditCaseForm";

const ClientCaseList = (props) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [userCaseData, setUserCaseData] = useState([]);
  const [cases, setCases] = useState(false);

  const loadCases = async () => {
    if (props.clientData) {
      let clientCases = [];
      const numOfCases = props.clientData.cases.length;
      for (let i = 0; i < numOfCases; i++) {
        const curCase = (await getCaseById(props.clientData.cases[i])).data;
        clientCases.push(curCase);
      }
      setUserCaseData(clientCases);
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

  const getUICaseList = () => {
    let UICaseList = [];
    for (let i = 0; i < userCaseData.length; i++) {
      const curCase = userCaseData[i];
      UICaseList.push(
        <Accordion>
          <Accordion.Title
            active={activeIndex === i}
            onClick={() => {
              toggleActive(i);
            }}
          >
            <Icon name="dropdown" />
            {curCase.startDate + ": " + curCase.type}
          </Accordion.Title>
          <Accordion.Content active={activeIndex === i}>
            <EditCaseForm
              caseIndex={i}
              clientData={props.clientData}
              triggerButtonColor={"yellow"}
              triggerButtonText={"Edit Case"}
            />
            <ProgCard
              case={userCaseData[i]}
              style={{ marginTop: "1000px !important" }}
            />
          </Accordion.Content>
        </Accordion>
      );
    }
    return UICaseList;
  };

  if (!userCaseData) {
    return <p>Awaiting case data...</p>;
  }

  return <div>{getUICaseList()}</div>;
};

export default ClientCaseList;
