import React, { useState } from "react";
import {
  Image,
  Item,
  Segment,
  Card,
  Popup,
  Container,
  Modal,
  Tab,
  Button,
} from "semantic-ui-react";
import ClientCaseCard from "./ClientCases/ClientCaseCard.js";
import InvoiceCard from "./ClientInvoices/InvoiceCard";
import "../Admin.css";
import ClientFiles from "./ClientFiles/ClientFiles";
import EditClient from "./EditClient";
import { deleteClient } from "../../../api/AdminApi";

const defaultImage = "https://react.semantic-ui.com/images/wireframe/image.png";
const ClientCard = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editClient, setEditClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [clientData, setClientData] = useState(props.clientData);

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
  function removeClient() {
    handleOpen();
    console.log("remove client happening.");
  }

  const panes = [
    {
      menuItem: "Cases",
      render: () => (
        <Tab.Pane style={{ height: 430 }} attached={false} loading={isLoading}>
          <ClientCaseCard
            clientData={props.clientData}
            setIsLoading={setIsLoading}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Invoices",
      render: () => (
        <Tab.Pane style={{ height: 430 }} attached={false} loading={isLoading}>
          <InvoiceCard
            clientData={props.clientData}
            clientName={props.clientName}
            setIsLoading={setIsLoading}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Files",
      render: () => (
        <Tab.Pane style={{ height: 430 }} attached={false} loading={isLoading}>
          <ClientFiles
            clientData={props.clientData}
            setIsLoading={setIsLoading}
          />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <Segment>
      <Item.Group unstackable>
        <Item>
          <Item.Image
            style={{ width: 70, height: 70 }}
            size="small"
            src={
              !(props.clientData && props.clientData.imageUrl)
                ? defaultImage
                : props.clientData.imageUrl
            }
          />
          <Item.Content>
            <Item.Header>
              {props.clientData.firstName + " " + props.clientData.secondName}
            </Item.Header>
            <Item.Description>
              <p>
                <b>Address: </b>
                {props.clientData.address.street +
                  ", " +
                  props.clientData.address.city +
                  ", " +
                  props.clientData.address.state}
              </p>
              <p>
                <b>Birthday: </b>
                {!(props.clientData && props.clientData.birthDate)
                  ? "N/A"
                  : props.clientData.birthDate}
              </p>
              <p>
                <b>Email: </b> {props.clientData.contact.email}
              </p>
              <p>
                <b>Phone number: </b> {props.clientData.contact.cellPhone}
              </p>
            </Item.Description>
          </Item.Content>
        </Item>
      </Item.Group>
      <Tab
        style={{ marginBottom: 10 }}
        renderActiveOnly={true}
        menu={{ pointing: true }}
        panes={panes}
      />
      <EditClient
        clientData={clientData}
        editClient={editClient}
        setEditClient={setEditClient}
      />

      <button class="positive ui button" onClick={() => setEditClient(true)}>
        Edit Client Information
      </button>
      <button class="negative ui button" onClick={() => removeClient()}>
        Remove
      </button>
     
      <Modal
        className="ui small modal"
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
          <button
            class="large negative left floated ui button Delete_Yes"
            onClick={() => {
              handleCloseAndDelete(props.clientData._id);
            }}
          >
            Yes
          </button>
          <button
            class="ui large right floated button Delete_No"
            onClick={() => {
              handleClose();
            }}
          >
            No
          </button>
        </Modal.Content>
      </Modal>
    </Segment>
  );
};

export default ClientCard;
