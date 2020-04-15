import React, { useState, useEffect } from "react";
import {Grid, Container, Header, Icon} from "semantic-ui-react";
import AdminNav from "../navbar/AdminNav";
import FooterComponent from "../../util/FooterComponent/FooterComponent";
import ClientList from "../clients/AdminClientList";
import Calendar from "../../calendar/Calendar";
import QBButton from "./QBButton"
import { getEvents } from "../../../api/AdminApi";

import "../Admin.css";

import { verifyAdmin } from "../../../api/AuthApi";
import { Redirect } from "react-router-dom";

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    verifyAdmin().then(verified => {
      if (verified) {
        setEventData(verified);
      }
      setIsVerified(verified);
      setLoading(false);
    })
  }, []);

  const setEventData = async (verified) => {
    if (events.length > 0) {
      return;
    }
    let eventResponse = await getEvents();
    console.log("Event response")
    console.log(eventResponse);
    if (eventResponse.data) {
      console.log("Successfully fetched event data");
      setEvents(eventResponse.data);
    } else {
      console.log(eventResponse.error);
      console.log("Unable to fetch event data");
    }
    setIsVerified(verified);
  };

  console.log("Loading")
  console.log(loading)
  console.log("Verified")
  console.log(isVerified)

  if (loading) {
    return <></>
  }

  if (!isVerified) {
    return <Redirect to="/adminlogin" />;
  }

  console.log("Events");
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
              <QBButton />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
      <FooterComponent/>
    </div>
  );
};

export default AdminDashboard;
