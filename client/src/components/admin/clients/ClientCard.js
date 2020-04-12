import React, { useState } from "react";
import { Image, Item } from "semantic-ui-react";
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

  return (
    <Item.Group>
      <Item>
        <Item.Image size="tiny" src={props.clientData.imageUrl} />

        <Item.Content>
          <Item.Header className="ClientCard">{props.clientName}</Item.Header>
          <Item.Meta>Contact Information</Item.Meta>
          <Item.Description>
            {"Email: " + props.clientData.contact.email}
          </Item.Description>
          <Item.Description>
            {"Phone: " + props.clientData.contact.cellPhone}
          </Item.Description>
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
        </Item.Content>
      </Item>
    </Item.Group>
  );
};

export default ClientCard;
