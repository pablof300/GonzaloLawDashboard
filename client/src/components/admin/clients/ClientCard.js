import React, { useState } from "react";
import { Image, Item } from "semantic-ui-react";
import ClientCaseCard from "./ClientCases/ClientCaseCard.js";
import "../Admin.css";

const ClientCard = (props) => {
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

export default ClientCard;
