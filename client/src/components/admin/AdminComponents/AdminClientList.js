import React from 'react'
import { Button, Card, Icon, Image, List, Container } from 'semantic-ui-react'
import AddClientForm from './AddClientForm'
import ClientCard from './ClientCard'
import Popup from 'reactjs-popup'
import './CSS/Admin.css'

const ClientList = () => {
  function AddClient(e) {
    console.log("add client happening.");
  }

  function ViewClient(e) {
    console.log("view client happening.");
  }

  return (
    <Card className='Card'>
      <List divided verticalAlign='middle'>
        <List.Item className='List-Header'>
          <List.Content floated='right'>
            <Popup trigger={
              <Button icon onClick={(e) => AddClient(e)}>
                <Icon name='plus square outline'/>
              </Button>} position="right center" modal closeOnDocumentClick>
              <Container className='FormContainer'><AddClientForm/></Container>
            </Popup>
          </List.Content>
        <List.Content id='content'>Client List</List.Content>
        </List.Item>
        <List.Item>
          <List.Content floated='right'>
            <Popup trigger={
              <Button onClick={(e) => ViewClient(e)}>View</Button>} position="right center" modal closeOnDocumentClick>
              <Container className='FormContainer'><ClientCard/></Container>
            </Popup>
          </List.Content>
          <Image avatar src='https://i.groupme.com/200x150.jpeg.6f275572e9ac4e74a548e82d18d96202.avatar' />
          <List.Content>Hutch VanDyke (Only this view works)</List.Content>
        </List.Item>
        <List.Item>
          <List.Content floated='right'>
            <Button>View</Button>
          </List.Content>
          <Image avatar src='https://i.groupme.com/200x200.png.6bb85205d3c343f18ef1ee3d3778cc9d.avatar' />
          <List.Content>Ed</List.Content>
        </List.Item>
        <List.Item>
          <List.Content floated='right'>
            <Button>View</Button>
          </List.Content>
          <Image avatar src='https://i.groupme.com/1024x1024.jpeg.9855215c76124dd685fcab3208fab18b.avatar' />
          <List.Content>Nate</List.Content>
        </List.Item>
        <List.Item>
          <List.Content floated='right'>
            <Button>View</Button>
          </List.Content>
          <Image avatar src='https://i.groupme.com/298x283.png.38e75988760b40f5b09dda24e21a1fea.avatar' />
          <List.Content>Herman</List.Content>
        </List.Item>
        <List.Item>
          <List.Content floated='right'>
            <Button>View</Button>
          </List.Content>
          <Image avatar src='https://i.groupme.com/885x1014.jpeg.09c68f85de8e41dbade2685a7f0975f9.avatar' />
          <List.Content>Tyler</List.Content>
        </List.Item>
        <List.Item>
          <List.Content floated='right'>
            <Button>View</Button>
          </List.Content>
          <Image avatar src='https://i.groupme.com/300x300.png.6485c42fdeaa45b5a4b986b9cb1c91a2.avatar' />
          <List.Content>Pablo</List.Content>
        </List.Item>
      </List>
    </Card>
  );
};

export default ClientList
