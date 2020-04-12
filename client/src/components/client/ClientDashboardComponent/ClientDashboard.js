import React, { useState, useEffect } from "react";
import "./ClientDashboard.css";
import "./UserDetails.css";
import NavBar from "../../util/NavBarComponent/NavBar";
import FooterComponent from "../../util/FooterComponent/FooterComponent";
import { Container, Grid, Header, Icon, Card } from "semantic-ui-react";
import ProgBarComponent from "../ProgBarComponent/ProgCard";
import FileComponent from "../FileComponent/FileComponent";
import PaymentCard from "../PaymentComponent/PaymentCard";
import {verifyAdmin, verifyUser} from "../../../api/AuthApi";
import { Redirect } from "react-router-dom";
import UserDetailsComponent from "./UserDetailsComponent";
import CaseDetailsComponent from "./CaseDetailsComponent";
import Calendar from "../../calendar/Calendar";
import { getEvents } from "../../../api/UserApi";


const ClientDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(true);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    verifyUser().then(verified => {
      if (isVerified) {
        setEventData(verified);
      }
      setIsVerified(verified);
      setLoading(false);
    })
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

  if (loading) {
    return <></>
  }

  if (!isVerified) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <NavBar />
      <Container className={"container"}>
        <Grid centered>
          <Grid.Row>
            <Header className={"header"} as="h2" icon textAlign="center">
              <Icon name="users" circular />
              <Header.Content>Client Dashboard</Header.Content>
            </Header>
          </Grid.Row>
          <Grid.Row>
            <CaseDetailsComponent />
          </Grid.Row>
          <Grid.Row className="LeftTab">
            <UserDetailsComponent />
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={8}>
              <Calendar adminView={false} events={events} />
            </Grid.Column>
            <Grid.Column width={8}>
              <PaymentCard />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <FileComponent />
          </Grid.Row>
        </Grid>
      </Container>
      <FooterComponent />
    </div>
  );
};

export default ClientDashboard;
