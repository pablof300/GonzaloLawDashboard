import React, { useState, useEffect } from "react";
import {Grid, Container, Header, Icon} from "semantic-ui-react";
import AdminNav from "../navbar/AdminNav";
import FooterComponent from "../../util/FooterComponent/FooterComponent";
import AdminList from "../list/AdminToDoList";
import ClientList from "../clients/AdminClientList";
import Calendar from "../../calendar/Calendar";
import { getEvents } from "../../../api/AdminApi";

import "../Admin.css";

import { verifyAdmin } from "../../../api/AuthApi";
import { Redirect } from "react-router-dom";

const AdminDashboard = () => {
  const [isVerified, setIsVerified] = useState(true);
  const [events, setEvents] = useState([]);

  verifyAdmin().then(verified => {
    setIsVerified(verified);
  });

  useEffect(() => {
    setEventData();
  }, []);

  const setEventData = async () => {
    if (events.length > 0) {
      return;
    }
    let eventResponse = await getEvents();
    console.log(eventResponse);
    if (eventResponse.data) {
      console.log("Successfully fetched event data");
      setEvents(eventResponse.data);
    } else {
      console.log(eventResponse.error);
      console.log("Unable to fetch event data");
    }
  };

  if (!isVerified) {
    return <Redirect to="/adminlogin" />;
  }

  console.log(events);
  return (
    <div>
      <AdminNav />
      <Header className={"header"} as="h2" icon textAlign="center">
        <Icon name="users" circular />
        <Header.Content>Admin Dashboard</Header.Content>
      </Header>
      <Container className="ContainerPaddingCorrection1">
        <Grid divided>
          <Grid.Row>
            <Grid.Column width={12}>
              <Calendar adminView={true} events={events} />
            </Grid.Column>
            <Grid.Column width={4}>
              <ClientList />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
      <FooterComponent/>
    </div>
  );
};

export default AdminDashboard;
