import React from "react";
import "./ClientDashboard.css";
import NavBar from "../../util/NavBarComponent/NavBar";
import { Container, Grid, Header, Icon, Card } from "semantic-ui-react";
import ProgBarComponent from "../ProgBarComponent/ProgCard";
import FileComponent from "../FileComponent/FileComponent";
import Calendar from "react-calendar";


const ClientDashboard = () => {
    return(
       <div>
        <NavBar/>
        <Container className={"container"}>
            <Grid centered>
                <Grid.Row>
                    <Header className={'header'} as='h2' icon textAlign='center'>
                        <Icon name='users' circular />
                        <Header.Content>Client Dashboard</Header.Content>
                    </Header>
                </Grid.Row>
                <Grid.Row>
                    <ProgBarComponent />
                </Grid.Row>
                <Grid.Row>
                    <FileComponent />
                </Grid.Row>
            </Grid>
        </Container>
        </div>
    );
}; 

export default ClientDashboard