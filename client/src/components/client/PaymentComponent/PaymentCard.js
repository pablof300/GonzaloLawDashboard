import React, { Component } from "react";
import { Card, Grid, Header, Menu } from "semantic-ui-react";
import "./PaymentComponent.css";

class PaymentCard extends Component {
  state = { activeItem: 'date' }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
  const { activeItem } = this.state

  return (
  <Card fluid>
    <Card.Content>
      <Card.Header className="header"> Payments </Card.Header>
      <Grid celled>
        <Grid.Row columns="2">
          <Grid.Column width="3">
            <Menu text vertical>
              <Menu.Item header>Sort By</Menu.Item>
              <Menu.Item
                name='date'
                active={activeItem === 'date'}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name='total'
                active={activeItem === 'total'}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name='paid'
                active={activeItem === 'paid'}
                onClick={this.handleItemClick}
              />
            </Menu>
          </Grid.Column>
          <Grid.Column width="13">
            <Menu text vertical fluid>
              <Menu.Item header> Estimates & Invoices </Menu.Item>
            </Menu>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Card.Content>
  </Card>
  );
};
}

export default PaymentCard;
