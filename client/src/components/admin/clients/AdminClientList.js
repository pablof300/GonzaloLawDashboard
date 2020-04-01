import React, { useState } from "react";
import { Button, Card, Icon, Image, List, Container } from "semantic-ui-react";
import AddClientForm from "./AddClientForm";
import ClientCard from "./ClientCard";
import Popup from "reactjs-popup";
import "../Admin.css";
import { getClients } from "../../../api/AdminApi";

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [isClientsPopulated, setIsClientsPopulated] = useState(false);

  function AddClient(e) {
    console.log("add client happening.");
  }

  function ViewClient(e) {
    console.log("view client happening.");
  }

  const loadClients = async () => {
    setClients((await getClients()));
    setIsClientsPopulated(true);
  };
  if (!isClientsPopulated) {
    loadClients();
  }

  return (
    <Card className="Card">
      <List divided verticalAlign="middle">
        <List.Item className="List-Header">
          <List.Content floated="right">
            <Popup
              trigger={
                <Button icon onClick={e => AddClient(e)}>
                  <Icon name="plus square outline" />
                </Button>
              }
              position="right center"
              modal
              closeOnDocumentClick
            >
              <Container className="FormContainer">
                <AddClientForm />
              </Container>
            </Popup>
          </List.Content>
          <List.Content id="content">Client List</List.Content>
        </List.Item>
        {clients.map(client =>
          <List.Item key={client._id}>
            <List.Content floated="right">
              <Popup
                trigger={<Button onClick={e => ViewClient(e)}>View</Button>}
                position="right center"
                modal
                closeOnDocumentClick
              >
                <Container className="FormContainer">
                  <ClientCard currentClient={client} setIsClientsPopulated={setIsClientsPopulated} />
                </Container>
              </Popup>
            </List.Content>
            <Image
              avatar
              src={client.avatar}
            />
            <List.Content>{client.realName}</List.Content>
          </List.Item>)
        }
      </List>
    </Card>
  );
};

export default ClientList;
