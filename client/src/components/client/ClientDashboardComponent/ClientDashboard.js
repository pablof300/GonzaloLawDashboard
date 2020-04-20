import React, { useState, useEffect } from "react";
import "./ClientDashboard.css";
import "./UserDetails.css";
import NavBar from "../../util/NavBarComponent/NavBar";
import FooterComponent from "../../util/FooterComponent/FooterComponent";
import { Container, Grid, Header, Icon, Card } from "semantic-ui-react";
import ProgBarComponent from "../ProgBarComponent/ProgCard";
import FileComponent from "../FileComponent/FileComponent";
import QBButton from "../../admin/dashboard/QBButton";
import { verifyAdmin, verifyUser } from "../../../api/AuthApi";
import { Redirect } from "react-router-dom";
import UserDetailsComponent from "./UserDetailsComponent";
import CaseDetailsComponent from "./CaseDetailsComponent";
import ClientInvoiceCard from "./ClientInvoiceCard";
import Calendar from "../../calendar/Calendar";
import { getEvents, getCurrentUser } from "../../../api/UserApi";
import { getURL, checkURLStatus } from "../../../api/QBApi";


const ClientDashboard = (props) => {
  const [loading, setLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(true);
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const [qbAuth, setQbAuth] = useState(false);
  const [events, setEvents] = useState([]);
  const [userData, setUserData] = useState([]);

  useEffect(async () => {
    let urlStatus = await checkURLStatus();
    if (urlStatus) {
      setQbAuth(true);
      console.log("WERE ACTUALLY ONLINE.");
    }
  }, []);

  useEffect(() => {
    verifyUser().then(verified => {
      if (verified) {
        setEventData(verified);
      }
      setIsVerified(verified);
      setLoading(false);
    })
  }, []);

  const loadUserData = async () => {
    const user = (await getCurrentUser()).data;
    if (user) {
      setUserData(user);
      setIsUserLoaded(true);
    }
  };
  if (!isUserLoaded) {
    loadUserData();
  }

  const startOAuth = async () => {
    let urlStatus = await checkURLStatus();

    if (urlStatus) {
      setQbAuth(true);
      console.log("WERE ACTUALLY ONLINE.");
    }
  };

  if (!qbAuth) {
    setQbAuth(true);
  }

  const setEventData = async () => {
    if (events.length > 0) {
      return;
    }
    console.log("EVENT DATA");
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
    <div className="clientDashboard">
      <NavBar />
      <Container className="container">
        <Grid centered>
          <Grid.Row>
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
              <ClientInvoiceCard clientData={userData} clientName={userData.firstName + " " + userData.secondName} />
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
