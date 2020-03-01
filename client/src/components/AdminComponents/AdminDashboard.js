import React from 'react'
import Calendar from 'react-calendar'
import Popup from 'reactjs-popup'
import { Grid, Image, Container } from 'semantic-ui-react'
import AdminNav from './AdminNav'
import AdminList from './AdminToDoList'
import ClientList from './AdminClientList'
import '../CSS/Admin.css'

const AdminDashboard = () => (
<div>
  <AdminNav/>
  <Container>
    <Grid columns='two' divided>
      <Grid.Row>
        <Grid.Column>
          <Calendar className='Calendar'/>
        </Grid.Column>
        <Grid.Column>
          <ClientList/>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Container className='ContainerPaddingCorrection'>
          <AdminList/>
        </Container>
      </Grid.Row>
    </Grid>
  </Container>
</div>
)

export default AdminDashboard;
