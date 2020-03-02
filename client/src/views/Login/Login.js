import React from "react";
import logo from "../../assets/logo.svg";
import "./Login.css";
import {
  Grid,
  Segment,
  Icon,
  Header,
  Button,
  Divider,
  Form,
  Input
} from "semantic-ui-react"

function Login() {
  return (
      <Grid stackable className="container">
        <Grid.Column width={4} />
        <Grid.Column width={8} >

          <Segment padded="very" stacked>
            <Header
              centered
              textAlign="center"
              as="div"
              icon
              style={{backgroundColor: 'white'}}
            >
              <Icon name="lock" />
              Client Login
            </Header>
            <Divider hidden />
            <Segment raised color="purple">
              <Form>
                <Form.Field
                  label="Username"
                  control={Input}
                />
                <Form.Input
                  label="Password"
                  control={Input}
                  type="password"
                />
                <Button primary type="submit">
                  Login
                </Button>
              </Form>
            </Segment>
          </Segment>
        </Grid.Column>
      </Grid>
  );
}

export default Login;
