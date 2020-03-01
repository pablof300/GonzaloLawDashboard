import React from 'react'
import { Button, Icon, Image, List, Container } from 'semantic-ui-react'
import AddClientForm from './AddClientForm'
import Popup from 'reactjs-popup'
import '../CSS/Admin.css'

const ClientList = () => {
  function AddClient(e) {
    console.log("add client happening.");
  }

  function ViewClient(e) {
    console.log("view client happening.");
  }

  return (
    <List divided verticalAlign='middle'>
      <List.Item className='List-Header'>
        <List.Content floated='right'>
          <Popup trigger={<Button icon onClick={(e) => AddClient(e)}>
            <Icon name='plus square outline'/>
          </Button>} position="right center" modal closeOnDocumentClick>
          <Container className='FormContainer'><AddClientForm/></Container>
        </Popup>
      </List.Content>
      <List.Content id='content'>Client List</List.Content>
    </List.Item>
    <List.Item>
      <List.Content floated='right'>
        <Button onClick={(e) => ViewClient(e)}>View</Button>
      </List.Content>
      <Image avatar src='https://react.semantic-ui.com/images/avatar/small/lena.png' />
      <List.Content>Lena</List.Content>
    </List.Item>
    <List.Item>
      <List.Content floated='right'>
        <Button>View</Button>
      </List.Content>
      <Image avatar src='https://react.semantic-ui.com/images/avatar/small/lindsay.png' />
      <List.Content>Lindsay</List.Content>
    </List.Item>
    <List.Item>
      <List.Content floated='right'>
        <Button>View</Button>
      </List.Content>
      <Image avatar src='https://react.semantic-ui.com/images/avatar/small/mark.png' />
      <List.Content>Mark</List.Content>
    </List.Item>
    <List.Item>
      <List.Content floated='right'>
        <Button>View</Button>
      </List.Content>
      <Image avatar src='https://react.semantic-ui.com/images/avatar/small/molly.png' />
      <List.Content>Molly</List.Content>
    </List.Item>
    </List>
  );
};

export default ClientList
