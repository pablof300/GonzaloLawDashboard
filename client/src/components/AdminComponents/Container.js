import React from 'react'
import Calendar from 'react-calendar'
import { Grid, Image, Container } from 'semantic-ui-react'

const Box = () => (
  <Container>
    <Grid columns='two' divided>
    <Grid.Row>
      <Grid.Column>
        <Calendar/>
      </Grid.Column>
      <Grid.Column>
        <Image src='https://img.favpng.com/19/5/14/koichi-hirose-jotaro-kujo-dio-brando-jojo-s-bizarre-adventure-noriaki-kakyoin-png-favpng-3F7Ag5c9sL8WeWFE4vxNM9K1b.jpg' />
      </Grid.Column>
    </Grid.Row>

    <Grid.Row>
      <Grid.Column>
        <Image src='https://img.favpng.com/19/5/14/koichi-hirose-jotaro-kujo-dio-brando-jojo-s-bizarre-adventure-noriaki-kakyoin-png-favpng-3F7Ag5c9sL8WeWFE4vxNM9K1b.jpg' />
      </Grid.Column>
    </Grid.Row>
    </Grid>
  </Container>
)

export default Container
