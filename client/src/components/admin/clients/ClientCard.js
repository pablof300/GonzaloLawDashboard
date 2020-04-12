import React, { useState } from "react";
import { Image, Item, Segment, Card } from "semantic-ui-react";
import ClientCaseCard from "./ClientCases/ClientCaseCard.js";
import "../Admin.css";

const ClientCard = props => {
  const [isOpen, setIsOpen] = useState(false);

  function handleOpen() {
    setIsOpen(true);
  }
  function handleClose() {
    setIsOpen(false);
  }
  function handleCloseAndDelete(clientId) {
    deleteClient(clientId);
    setIsOpen(false);
    props.setIsClientsPopulated(false);
  }

  console.log(props.clientData)

  return (
    <Segment>
      <Item.Group>
        <Item>
          <Item.Image size='small' src={props.clientData.imageUrl} />
          <Item.Content>
            <Item.Header>{props.clientData.firstName + ' ' + props.clientData.secondName}</Item.Header>
            <Item.Description>
              <p>{props.clientData.address.street + ", " + props.clientData.address.city + ", " + props.clientData.address.state}</p>
              <p>{props.clientData.birthDate}</p>
              <p>{props.clientData.contact.email}</p>
              <p>{props.clientData.contact.cellPhone}</p>
            </Item.Description>
          </Item.Content>
        </Item>
      </Item.Group>
      <ClientCaseCard clientData={props.clientData} />
      <Popup
        trigger={<button class="negative ui button" onClick={e => removeClient(e)}>Delete</button>}
        position="bottom left"
        modal
        closeOnDocumentClick
        open={isOpen}
        onOpen={handleOpen}
        onClose={handleClose}

      >
        <Container className="FormContainer">
          <h3 className="ui center aligned header">
            Are you sure you want to delete {props.clientName} as a client?
            </h3>
          <button class="large negative left floated ui button" onClick={() => { handleCloseAndDelete(props.clientData._id) }}>Yes</button>
          <button class="ui large right floated button" onClick={() => { handleClose() }}>No</button>
        </Container>
      </Popup>
    </Segment>
  );
};

export default ClientCard;
