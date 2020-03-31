import React, {useState} from "react";
import { Button, Card, Icon, Image, List, Container, Modal } from "semantic-ui-react";
import AddClientForm from "./AddClientForm";
import ClientCard from "./ClientCard";
import Popup from "reactjs-popup";
import "../Admin.css";
import { getCurrentAdmin } from "../../../../src/api/AdminApi";

const defaultProfile =
  "https://react.semantic-ui.com/images/wireframe/square-image.png";


const ClientList = () => {
  const [listOfClients, setClientList] = useState([]);
  const [clients, setClients] = useState(false);

  const loadUsers = async () => {
    const lawyerClients  = (await getCurrentAdmin()).data.clients;
    setClientList(lawyerClients);
    setClients(true);
  };

  if (!clients) {loadUsers();}

  const myClientList = [];
    if (clients) {
          console.log(listOfClients);
          for (let i = 0; i < listOfClients.length; i++) {
            myClientList.push(listOfClients[i]);
          }
        }
       
   const showClientList = myClientList.map(client => {
    console.log(client)      
    return (
            <List.Item>
                  <List.Content floated="right">
                    <Popup
                      trigger={<Button onClick={e => ViewClient(e)}>View</Button>}
                      position="right center"
                      modal
                      closeOnDocumentClick
                    >
                      <Container className="FormContainer">
                        <ClientCard 
                        clientName = {client.firstName + " " + client.secondName}
                        clientContact = {client.contact}
                        />
                      </Container>
                    </Popup>
                  </List.Content>
                  <Image
                    avatar
                    src= { !(client && client.imageUrl) ? defaultProfile : client.imageUrl} 
                  />
                  <List.Content>{ !(client && client.firstName && client.secondName) ? "nuttin loaded" : client.firstName + " " + client.secondName}</List.Content>
                </List.Item>
          );
        });
    
  

  function AddClient(e) {
    console.log("add client happening.");
  }

  function ViewClient(e) {
    console.log("view client happening.");
  }

  return (
    <Card className="Card">
      <List divided verticalAlign="middle">
        <List.Item className="List-Header">
          <List.Content floated="right">
            <Modal
              trigger={
                <Button icon onClick={e => AddClient(e)}>
                  <Icon name="plus square outline" />
                </Button>
              }
            >
                <Modal.Header>Create a new client</Modal.Header>
                <Modal.Content>
                    <AddClientForm />
                </Modal.Content>
            </Modal>
          </List.Content>
          <List.Content id="content">Client List</List.Content>
        </List.Item>
        {showClientList}
      </List>
    </Card>
  );
};

export default ClientList;
