import React, { useState } from "react";
import {
  Icon,
  Item,
  Segment,
  Modal,
  Tab,
  Button,
  Label,
  Loader,
  Dimmer,
  Transition,
  TransitionablePortal,
} from "semantic-ui-react";
import ClientCaseCard from "./ClientCases/ClientCaseCard.js";
import InvoiceCard from "./ClientInvoices/InvoiceCard";
import "../Admin.css";
import ClientFiles from "./ClientFiles/ClientFiles";
import EditClient from "./EditClient";
import { deleteClient } from "../../../api/AdminApi";
import Popup from "reactjs-popup";
import "./ClientCard.css";

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
        <div style={{ height: 400 }}>
          <ClientCaseCard clientData={props.clientData} />
        </div>
      ),
    },
    {
      menuItem: "Invoices",
      render: () => (
        <div style={{ height: 400 }}>
          <InvoiceCard
            clientData={props.clientData}
            clientName={props.clientName}
          />
        </div>
      ),
    },
    {
      menuItem: "Files",
      render: () => (
        <div style={{ height: 400 }}>
          <Loader active={isLoading} style={{ marginTop: 75 }} />
          <ClientFiles
            clientData={props.clientData}
            setIsLoading={setIsLoading}
          />
        </div>
      ),
    },
  ];

  function callNum() {
    if (props.clientData.contact && props.clientData.contact.cellPhone) {
      const number = "tel:" + props.clientData.contact.cellPhone;
      window.open(number);
    }
  }
  /**
   *   <Transition visible={props.openClient} animation="fade" duration={200}>
        <Dimmer.Inner active page />
      </Transition>
   */

  return (
    <div className="center1">
     <Transition visible={props.openClient} animation="fade" duration={200}>
        <Dimmer.Inner active={props.openClient} page />
      </Transition>

      <TransitionablePortal
        closeOnDocumentClick={false}
        closeOnPortalMouseLeave={false}
        transition={{ animation: "scale", duration: 200 }}
        open={props.openClient}
        size="large"
      >
      
        <Segment
          className="center1"
          raised
          style={{
            left: "25%",
            position: "fixed",
            top: "2%",
            zIndex: 1000,
          }}
        >
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
                  {!props.clientData
                    ? ""
                    : props.clientData.firstName +
                      " " +
                      props.clientData.secondName}
                </Item.Header>
                <Item.Description>
                  <p>
                    <b> Address: </b>
                    {!props.clientData
                      ? ""
                      : props.clientData.address.street +
                        ", " +
                        props.clientData.address.city +
                        ", " +
                        props.clientData.address.state}
                  </p>
                  <p>
                    <b> Birthday: </b>
                    {!(props.clientData && props.clientData.birthDate)
                      ? "N/A"
                      : props.clientData.birthDate}
                  </p>
                  <p>
                    <b> Email: </b>{" "}
                    {!(props.clientData && props.clientData.contact)
                      ? ""
                      : props.clientData.contact.email}
                  </p>
                  <p>
                    <b> Phone number: </b>
                    {
                      <Label onClick={callNum}>
                        <Icon name="call" />
                        {!(props.clientData && props.clientData.contact)
                          ? ""
                          : props.clientData.contact.cellPhone}
                      </Label>
                    }
                  </p>
                </Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
          <Tab
            style={{ marginTop: 30 }}
            renderActiveOnly={true}
            menu={{ pointing: true }}
            panes={panes}
          />
          <EditClient
            editClient={editClient}
            setEditClient={setEditClient}
            clientData={props.clientData}
          />

          <button
            class="positive ui button"
            onClick={() => setEditClient(true)}
          >
            Edit Client Information
          </button>
          <button class="negative ui button" onClick={() => removeClient()}>
            Remove
          </button>

          <Button floated="right" onClick={() => props.setOpenClient(false)}>
            Done
          </Button>

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
      </TransitionablePortal>
    </div>
  );
};

export default ClientCard;
