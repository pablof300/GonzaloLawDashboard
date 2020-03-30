import React, { useState } from "react";
import { Grid, Container } from "semantic-ui-react";
import AdminNav from "../navbar/AdminNav";
import AdminList from "../list/AdminToDoList";
import ClientList from "../clients/AdminClientList";
import Calendar from "../../calendar/Calendar";

import "../Admin.css";

import { verifyAdmin } from "../../../api/AuthApi";
import { Redirect } from "react-router-dom";

const AdminDashboard = () => {
  const [isVerified, setIsVerified] = useState(true);

  verifyAdmin().then(verified => {
    setIsVerified(verified);
  });

  if (!isVerified) {
    return <Redirect to="/adminlogin" />;
  }

  const dummyEvents = [
    {
      title: "Mr. Estrada",
      start: "2020-03-18T10:30:00",
      end: "2020-03-18T12:30:00"
    },
    {
      title: "Mr. Hutch",
      start: "2020-03-22T10:30:00",
      end: "2020-03-22T12:30:00"
    }
  ];

  return (
    <div>
      <AdminNav />
      <Container className="ContainerPaddingCorrection1">
        <Grid divided>
          <Grid.Row>
            <Grid.Column width={12}>
              <Calendar events={dummyEvents} />
            </Grid.Column>
            <Grid.Column width={4}>
              <ClientList />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Container className="ContainerPaddingCorrection2">
              <AdminList />
            </Container>
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  );
};

export default AdminDashboard;
