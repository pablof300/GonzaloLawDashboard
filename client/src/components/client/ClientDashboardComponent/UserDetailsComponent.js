import React, {useState} from "react";
import { Tab, Container } from "semantic-ui-react";
import MyAccount from "./MyAccount";
import MyTeam from "./MyTeam";
import MyCompany from "./MyCompany";



const UserDetailsComponent = () => {

  const [isLoading, setIsLoading] = useState(true)

  const panes = [
    {
      menuItem: "My Account",
      render: () => (
        <Tab.Pane loading={isLoading}>
          <MyAccount setIsLoading={setIsLoading} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "My Company",
      render: () => (
        <Tab.Pane loading={isLoading}>
          <MyCompany setIsLoading={setIsLoading} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "My Team",
      render: () => (
        <Tab.Pane loading={isLoading}>
          <MyTeam setIsLoading={setIsLoading} />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <Container style={{ marginBottom: "-15vh" }}>
      <Tab
        renderActiveOnly={true}
        menu={{ fluid: true, vertical: true, tabular: true }}
        panes={panes}
      />
    </Container>
  );
};

export default UserDetailsComponent;
