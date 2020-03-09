import React from 'react'
import { Image, Item } from 'semantic-ui-react'
import './CSS/Admin.css'

const ClientCard = () => (
  <Item.Group>
    <Item>
      <Item.Image size='tiny' src='https://i.groupme.com/200x150.jpeg.6f275572e9ac4e74a548e82d18d96202.avatar' />

      <Item.Content>
        <Item.Header className='ClientCard'>Hutch VanDyke</Item.Header>
        <Item.Meta>Description</Item.Meta>
        <Item.Description>
          <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
        </Item.Description>
        <Item.Extra>Additional Details</Item.Extra>
      </Item.Content>
    </Item>
  </Item.Group>
)

export default ClientCard
