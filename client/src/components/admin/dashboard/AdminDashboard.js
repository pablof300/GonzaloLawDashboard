import React, { useState, useEffect, useLayoutEffect } from "react";
import { Grid, Container } from "semantic-ui-react";
import AdminNav from "../navbar/AdminNav";
import AdminList from "../list/AdminToDoList";
import ClientList from "../clients/AdminClientList";
import Calendar from "../../calendar/Calendar";
import { getEvents } from "../../../api/AdminApi";

import "../Admin.css";

import { verifyAdmin } from "../../../api/AuthApi";
import { Redirect } from "react-router-dom";

const AdminDashboard = () => {
  const [isVerified, setIsVerified] = useState(true);
  const [events, setEvents] = useState([])

  verifyAdmin().then(verified => {
    setIsVerified(verified);
  })

  useEffect(() => {
      setEventData()
  });

  const setEventData = async () => {
    if (events.length > 0) {
      return
    }
    let eventResponse = await getEvents()
    console.log(eventResponse)
    if (eventResponse.data) {
      console.log("Successfully fetched event data");
      setEvents(eventResponse.data);
    } else {
      console.log(eventResponse.error)
      console.log("Unable to fetch event data")
    };
  };

  if (!isVerified) {
    return <Redirect to="/adminlogin" />;
  }

  console.log(events)
  return (
    <div>
      <AdminNav />
      <Container className="ContainerPaddingCorrection1">
        <Grid divided>
          <Grid.Row>
            <Grid.Column width={12}>
              <Calendar events={events} />
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
