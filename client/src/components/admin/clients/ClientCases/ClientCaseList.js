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
