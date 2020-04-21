import React, { useState } from "react";
import {
  Button,
  Card,
  Icon,
  Image,
  List,
  Container,
  Modal
} from "semantic-ui-react";
import AddClientForm from "./AddClientForm";
import ClientCard from "./ClientCard";
import Popup from "reactjs-popup";
import "../Admin.css";
import { getAllClients } from "../../../../src/api/AdminApi";



const defaultProfile =
  "https://react.semantic-ui.com/images/wireframe/square-image.png";

const ClientList = () => {
  const [listOfClients, setClientList] = useState([]);
  const [clients, setClients] = useState(false);
  const [isClientsPopulated, setIsClientsPopulated] = useState(false);

  const loadUsers = async () => {
    const lawyerClients = await getAllClients();
    setClientList(lawyerClients.data);
    setClients(true);
  };

  const addClientCallback = (client) => {
    let currentClients = listOfClients;
    currentClients.push(client)
    setClientList(currentClients)
  }

  if (!clients) {
    loadUsers();
  }

  const myClientList = [];
  if (clients) {
    for (let i = 0; i < listOfClients.length; i++) {
      myClientList.push(listOfClients[i]);
    }
  }

  const showClientList = myClientList.map(client => {
    return (
      <List.Item>
        <List.Content floated="right">
          <Popup
            trigger={<Button className="viewClientButton" onClick={e => ViewClient(e)}>View</Button>}
            position="right center"
            modal
            closeOnDocumentClick
          >
            <ClientCard
              clientData={client}
              clientName={client.firstName + " " + client.secondName}
              clientContact={client.contact}
              setIsClientsPopulated={setClients}
              setIsClientsPopulatedPagination={setIsClientsPopulated}
            />
            {/* This is kind of poorly named, but setClients, is setClientsPopulated in the client card, while 
              setIsClientsPopulated is setIsClientsPopulatedPagination in the client card. Fix some naming conventions
              for readability in the future.*/}
          </Popup>
        </List.Content>
        <Image
          avatar
          src={!(client && client.imageUrl) ? defaultProfile : client.imageUrl}
        />
        <List.Content>
          {!(client && client.firstName && client.secondName)
            ? "Error: Failed to Load. Please refresh page."
            : client.firstName + " " + client.secondName}
        </List.Content>
      </List.Item>
    );
  });

  function ViewClient(e) {
    console.log("view client happening.");
  }

  return (
    <Card className="Card">
      <List divided verticalAlign="middle">
        <List.Item className="List-Header">
          <List.Content floated="right">
            <AddClientForm addClientCallback={addClientCallback} setClients={setClients} setIsClientsPopulated={setIsClientsPopulated} isClientsPopulated={isClientsPopulated} />
          </List.Content>
          <List.Content id="content">Client List</List.Content>
        </List.Item>
        {showClientList}
      </List>
    </Card>
  );
};

export default ClientList;
