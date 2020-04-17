import React, { useState } from "react";
import { Image, Item, Segment, Card, Popup, Container, Modal } from "semantic-ui-react";
import ClientCaseCard from "./ClientCases/ClientCaseCard.js";
import InvoiceCard from "./ClientInvoices/InvoiceCard"
import "../Admin.css";
import { deleteClient } from "../../../api/AdminApi"

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
    props.setIsClientsPopulatedPagination(false);
  }
  function removeClient(e) {
    console.log("remove client happening.");
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
      <InvoiceCard clientData={props.clientData} clientName={props.clientName} />
      <Modal
        className="ui small modal"
        trigger={<button class="negative ui button" onClick={e => removeClient(e)} >Remove</button>}
        position="bottom left"
        closeOnDocumentClick
        open={isOpen}
        onOpen={handleOpen}
        onClose={handleClose}
      >
        <Modal.Header>
          <div className="ui small center aligned header Delete_Header">
            Are you sure you want to remove {props.clientName} as a client?
          </div>
        </Modal.Header>
        <Modal.Content className="ui center aligned">
          <button class="large negative left floated ui button Delete_Yes" onClick={() => { handleCloseAndDelete(props.clientData._id) }}>Yes</button>
          <button class="ui large right floated button Delete_No" onClick={() => { handleClose() }}>No</button>
        </Modal.Content>
      </Modal>
    </Segment>
  );
};

export default ClientCard;
