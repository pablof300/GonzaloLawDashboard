import React, { useState } from "react";
import { Image, Item, Segment, Card } from "semantic-ui-react";
import ClientCaseCard from "./ClientCases/ClientCaseCard.js";
import "../Admin.css";

const ClientCard = props => {

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
      </Segment>

  );
};

export default ClientCard;
