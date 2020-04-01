import React, {useState} from "react";
import { Image, Item } from "semantic-ui-react";
import ClientCaseCard from "./ClientCases/ClientCaseCard.js";
import "../Admin.css";
import ClientCaseCard from "./ClientCases/ClientCaseCard";

const ClientCard = (props) => {
  return(
  <Item.Group>
    <Item>
      <Item.Image
        size="tiny"
        src={props.clientData.imageUrl}
      />
      <Item.Content>
        <Item.Header className="ClientCard">{props.clientName}</Item.Header>
        <Item.Meta>Contact Information</Item.Meta>
        <Item.Description>
        {"Email: " + props.clientData.contact.email}
        </Item.Description>
<<<<<<< HEAD
        <Item.Extra>Additional Details</Item.Extra>
        <ClientCaseCard />
=======
        <Item.Description>
        {"Phone: " + props.clientData.contact.cellPhone}
        </Item.Description>
        <ClientCaseCard/>
>>>>>>> f7c092c9272d6e4ec8c514b5868ee3b3883e6f14
      </Item.Content>
    </Item>
  </Item.Group>
);
}

export default ClientCard;
