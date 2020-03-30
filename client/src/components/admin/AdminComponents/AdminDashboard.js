import React, { useState } from "react";
import Calendar from "react-calendar";
import { Grid, Container } from "semantic-ui-react";
import AdminNav from "./AdminNav";
import AdminList from "./AdminToDoList";
import ClientList from "./AdminClientList";
import "./CSS/Admin.css";
import "./CSS/Calendar.css";
import "react-calendar/dist/Calendar.css";
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

  return (
    <div>
      <AdminNav />
      <Container className="ContainerPaddingCorrection1">
        <Grid columns="two" divided>
          <Grid.Row>
            <Grid.Column>
              <Calendar className="Test" />
            </Grid.Column>
            <Grid.Column>
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
