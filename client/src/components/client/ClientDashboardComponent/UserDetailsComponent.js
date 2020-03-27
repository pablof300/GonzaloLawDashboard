import React from "react";
import { Tab, Container } from "semantic-ui-react";
import MyAccount from "./MyAccount";
import MyTeam from "./MyTeam";

const panes = [
  { menuItem: "My Account", render: () => <MyAccount /> },
  { menuItem: "My Team", render: () => <MyTeam /> }
];

const UserDetailsComponent = () => {
  return (
    <Container>
      <Tab
        renderActiveOnly={true}
        menu={{ fluid: true, vertical: true, tabular: true }}
        panes={panes}
      />
    </Container>
  );
};

export default UserDetailsComponent;
