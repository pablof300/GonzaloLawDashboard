import React from "react";
import { Tab, Container } from "semantic-ui-react";
import MyAccount from "./MyAccount";
import MyTeam from "./MyTeam";
import MyCompany from "./MyCompany"

const panes = [
  { menuItem: "My Account", render: () => <MyAccount /> },
  { menuItem: "My Company", render: () => <MyCompany /> },
  { menuItem: "My Team", render: () => <MyTeam /> },
  
];

const UserDetailsComponent = () => {
  return (
    <Container style={{marginBottom: '-15vh'}}>
      <Tab
        renderActiveOnly={true}
        menu={{ fluid: true, vertical: true, tabular: true }}
        panes={panes}
      />
    </Container>
  );
};

export default UserDetailsComponent;
