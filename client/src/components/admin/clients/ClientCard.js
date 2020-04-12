import React, { useState } from "react";
import { Image, Item } from "semantic-ui-react";
import ClientCaseCard from "./ClientCases/ClientCaseCard.js";
import "../Admin.css";

const ClientCard = props => {
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
        </Item.Content>
      </Item>
    </Item.Group>
  );
};

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

  console.log("current client:");
  console.log(props.currentClient);

  return (
    < Item.Group >
      <Item>
        <Item.Image
          size="tiny"
          src={props.currentClient.avatar}
        />

        <Item.Content>
          <Item.Header className="ClientCard">{props.currentClient.realName}</Item.Header>
          <Item.Meta>Description</Item.Meta>
          <Item.Description>
            <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
          </Item.Description>
          <Item.Extra>Additional Details</Item.Extra>
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
                Are you sure you want to delete {props.currentClient.realName} as a client?
            </h3>
              <button class="large negative left floated ui button" onClick={() => { handleCloseAndDelete(props.currentClient._id) }}>Yes</button>
              <button class="ui large right floated button" onClick={() => { handleClose() }}>No</button>
            </Container>
          </Popup>
        </Item.Content>
      </Item>
    </Item.Group >
  );
};

export default ClientCard;
