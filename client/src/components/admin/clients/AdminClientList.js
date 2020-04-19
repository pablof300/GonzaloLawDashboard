import React, { useState } from "react";
import {
  Button,
  Card,
  Icon,
  Image,
  List,
  Table,
  Container,
  Modal,
} from "semantic-ui-react";
import AddClientForm from "./AddClientForm";
import ClientCard from "./ClientCard";
import "../Admin.css";
import { getAllClients } from "../../../../src/api/AdminApi";

const defaultProfile =
  "https://react.semantic-ui.com/images/wireframe/square-image.png";

const ClientList = () => {
  const [listOfClients, setClientList] = useState([]);
  const [clients, setClients] = useState(false);
  const [isClientsPopulated, setIsClientsPopulated] = useState(false);
  const [openClient, setOpenClient] = useState(false);
  const [clientData, setClientData] = useState(null);

  const loadUsers = async () => {
    const lawyerClients = await getAllClients();
    setClientList(lawyerClients.data);
    setClients(true);
  };

  const addClientCallback = (client) => {
    let currentClients = listOfClients;
    currentClients.push(client);
    setClientList(currentClients);
  };

  if (!clients) {
    loadUsers();
  }

  const myClientList = [];
  if (clients) {
    for (let i = 0; i < listOfClients.length; i++) {
      myClientList.push(listOfClients[i]);
    }
  }

  function ViewClient(client) {
    setOpenClient(true);
    console.log("view client happening.");
    setClientData(client);
  }

  const showClientList = myClientList.map((client) => {
    return (
      <List.Item key={client._id}>
        <Image
        style={{width:40, height:40}}
          avatar
          src={!(client && client.imageUrl) ? defaultProfile : client.imageUrl}
        />
        <List.Content>
          {!(client && client.firstName && client.secondName)
            ? "nuttin loaded"
            : client.firstName + " " + client.secondName}
        </List.Content>
        <List.Content floated="right">
          <Button onClick={() => ViewClient(client)}>View</Button>
        </List.Content>
      </List.Item>
    );
  });

  return (
    <Card className="Card">
      <List verticalAlign='middle' divided verticalAlign="middle">
        <List.Item className="List-Header">
          <List.Content floated="right">
            <AddClientForm
              addClientCallback={addClientCallback}
              setClients={setClients}
              setIsClientsPopulated={setIsClientsPopulated}
              isClientsPopulated={isClientsPopulated}
            />
          </List.Content>
          <List.Content id="content">Client List</List.Content>
        </List.Item>
        {showClientList}
      </List>

      <ClientCard
        openClient={openClient}
        setOpenClient={setOpenClient}
        clientData={clientData}
        setIsClientsPopulated={setClients}
        setIsClientsPopulatedPagination={setIsClientsPopulated}
      />
    </Card>
  );
};

export default ClientList;
