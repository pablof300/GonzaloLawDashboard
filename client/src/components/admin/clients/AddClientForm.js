import React, { useState } from "react";
import { Button, Form, Icon, Input, Modal } from "semantic-ui-react";
import { addClient } from "../../../api/AdminApi";

const AddClientForm = (props) => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [middleName, setMiddleName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [otherName, setOtherName] = useState(null);
  const [street, setStreet] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [zipCode, setZipCode] = useState(null);
  const [homePhone, setHomePhone] = useState(null);
  const [workPhone, setWorkPhone] = useState(null);
  const [cellPhone, setCellPhone] = useState(null);
  const [email, setEmail] = useState(null);
  const [open, setOpen] = useState(false);

  class AddClientForm extends Component {
    state = {};
    handleChange = (e, { value }) => this.setState({ value });

    render() {
      const { value } = this.state;
      return (
        <Form>
          <Form.Group widths="equal">
            <Form.Field
              control={Input}
              label="Username"
              placeholder="Username"
            />
            <Form.Field
              control={Input}
              label="Password"
              placeholder="Password"
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field
              control={Input}
              label="First name"
              placeholder="First name"
            />
            <Form.Field
              control={Input}
              label="Last name"
              placeholder="Last name"
            />
            <Form.Field
              control={Select}
              label="Case"
              options={options}
              placeholder="Type"
            />
          </Form.Group>
          <Form.Field
            control={TextArea}
            label="About"
            placeholder="Brief description can be included here..."
          />
          <Form.Field control={Checkbox} label="Confirm details" />
          <Form.Field control={Button}>Add Client</Form.Field>
        </Form>
      );
      console.log(addClientResponse);
      if (addClientResponse.data) {
        alert("Successfully added new client!");
        props.addClientCallback(addClientResponse.data)
        setOpen(false);
      } else {
        alert("Failed to add client, please try again!");
        console.log("Unable to add client");
      }
    };

    return(
    <Modal
      trigger = {
        < Button icon onClick = {() => setOpen(true)}>
  <Icon name="plus square outline" />
        </Button >
      }
open = { open }
  >
  <Modal.Header>Create a new client</Modal.Header>
  <Modal.Content>
    <Form>
      <Form.Group widths="equal">
        <Form.Field
          control={Input}
          label="Username"
          placeholder="Username"
          onChange={event => setUsername(event.target.value)}
        />
        <Form.Field
          control={Input}
          label="Password"
          placeholder="Last name"
          onChange={event => setPassword(event.target.value)}
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Field
          control={Input}
          label="First name"
          placeholder="First name"
          onChange={event => setFirstName(event.target.value)}
        />
        <Form.Field
          control={Input}
          label="Middle name"
          placeholder="Middle name"
          onChange={event => setMiddleName(event.target.value)}
        />
        <Form.Field
          control={Input}
          label="Last name"
          placeholder="Last name"
          onChange={event => setLastName(event.target.value)}
        />
        <Form.Field
          control={Input}
          label="Preferred Name"
          placeholder="Preferred Name"
          onChange={event => setOtherName(event.target.value)}
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Field
          control={Input}
          label="Street"
          placeholder="Street"
          onChange={event => setStreet(event.target.value)}
        />
        <Form.Field
          control={Input}
          label="City"
          placeholder="City"
          onChange={event => setCity(event.target.value)}
        />
        <Form.Field
          control={Input}
          label="State"
          placeholder="State"
          onChange={event => setState(event.target.value)}
        />
        <Form.Field
          control={Input}
          label="Zip code"
          placeholder="Zip code"
          onChange={event => setZipCode(parseInt(event.target.value))}
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Field
          control={Input}
          label="Home phone"
          placeholder="Home phone"
          onChange={event => setHomePhone(parseInt(event.target.value))}
        />
        <Form.Field
          control={Input}
          label="Work phone"
          placeholder="Work phone"
          onChange={event => setWorkPhone(parseInt(event.target.value))}
        />
        <Form.Field
          control={Input}
          label="Cell phone"
          placeholder="Cell phone"
          onChange={event => setCellPhone(parseInt(event.target.value))}
        />
        <Form.Field
          control={Input}
          label="Email"
          placeholder="Email"
          onChange={event => setEmail(event.target.value)}
        />
      </Form.Group>
      <Button onClick={() => createNewClient()}>Add Client</Button>
      <Button onClick={() => setOpen(false)}>Cancel</Button>
    </Form>
  </Modal.Content>
    </Modal >
  );
};

export default AddClientForm;
