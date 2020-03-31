import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
} from "semantic-ui-react";

const AddClientForm = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [middleName, setMiddleName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [otherName, setOtherName] = useState(null);
  const [address, setAddress] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [zipCode, setZipCode] = useState(null);
  const [homePhone, setHomePhone] = useState(null);
  const [workPhone, setWorkPhone] = useState(null);
  const [cellPhone, setCellPhone] = useState(null);
  const [email, setEmail] = useState(null);
    return (
      <Form>
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            label="Username"
            placeholder="Username"
            onChange = {event => setUsername(event.target.value)}
          />
          <Form.Field
            control={Input}
            label="Password"
            placeholder="Last name"
            onChange = {event => setPassword(event.target.value)}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field
              control={Input}
              label="First name"
              placeholder="First name"
              onChange = {event => setFirstName(event.target.value)}
          />
          <Form.Field
              control={Input}
              label="Middle name"
              placeholder="Middle name"
              onChange = {event => setMiddleName(event.target.value)}
          />
          <Form.Field
              control={Input}
              label="Last name"
              placeholder="Last name"
              onChange = {event => setLastName(event.target.value)}
          />
          <Form.Field
              control={Input}
              label="Preferred Name"
              placeholder="Preferred Name"
              onChange = {event => setOtherName(event.target.value)}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field
              control={Input}
              label="Address"
              placeholder="Address"
              onChange = {event => setAddress(event.target.value)}
          />
          <Form.Field
              control={Input}
              label="City"
              placeholder="City"
              onChange = {event => setCity(event.target.value)}
          />
          <Form.Field
              control={Input}
              label="State"
              placeholder="State"
              onChange = {event => setState(event.target.value)}
          />
          <Form.Field
              control={Input}
              label="Zip code"
              placeholder="Zip code"
              onChange = {event => setZipCode(parseInt(event.target.value))}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field
              control={Input}
              label="Home phone"
              placeholder="Home phone"
              onChange = {event => setHomePhone(parseInt(event.target.value))}
          />
          <Form.Field
              control={Input}
              label="Work phone"
              placeholder="Work phone"
              onChange = {event => setWorkPhone(parseInt(event.target.value))}
          />
          <Form.Field
              control={Input}
              label="Cell phone"
              placeholder="Cell phone"
              onChange = {event => setCellPhone(parseInt(event.target.value))}
          />
          <Form.Field
              control={Input}
              label="Email"
              placeholder="Email"
              onChange = {event => setEmail(event.target.value)}
          />
        </Form.Group>
        <Button>Add Client</Button>
      </Form>
    );
}

export default AddClientForm;
