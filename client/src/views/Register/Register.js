import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  Icon,
  Input,
  Transition,
  TransitionablePortal,
  Dimmer,
  Segment,
} from "semantic-ui-react";
import Snackbar from "../../Snackbar";

const Register = (props) => {
  const defaultError = "An unknown error occurred";
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
  const [dob, setDob] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [website, setWebsite] = useState("");
  const [snackbar, setSnackBar] = useState({
    enable: false,
    message: "Success",
    type: "success",
    color: "green",
  });

  // Create new client
  const createAccount = async () => {
    /*if (addClientResponse.data) {
      alert("Successfully added new client!");
      props.addClientCallback(addClientResponse.data);
      setOpen(false);
    } else {
      alert("Failed to add client, please try again!");
      console.log("Unable to add client");
    }*/
    handleCancel();
    setTimeout(() => {
      setSnackBar({
        enable: true,
        message: "Success",
        type: "checkmark",
        color: "green",
      });
    }, 1650);
  };

  function handleCancel() {
    props.setRegister(false);
  }

  const RefreshPage = () => {
    window.location.reload(false);
  };

  return (
    <div>
      <Transition visible={props.register} animation="fade" duration={200}>
        <Dimmer.Inner active={props.register} page />
      </Transition>

      <TransitionablePortal
        dimmer="inverted"
        closeOnPortalMouseLeave={false}
        closeOnDocumentClick={false}
        transition={{ animation: "scale", duration: 200 }}
        size="large"
        open={props.register}
      >
        <Segment
          style={{
            left: "20%",
            position: "fixed",
            top: "5%",
            zIndex: 1000,
          }}
        >
          <Form>
            <h1>
              <b>Register an account</b>
            </h1>
            <Form.Group widths="equal">
              <Form.Field
                control={Input}
                label="Username"
                placeholder="Username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
              <Form.Field
                control={Input}
                label="Password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field
                control={Input}
                label="First name"
                placeholder="First name"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
              />
              <Form.Field
                control={Input}
                label="Middle name"
                placeholder="Middle name"
                value={middleName}
                onChange={(event) => setMiddleName(event.target.value)}
              />
              <Form.Field
                control={Input}
                label="Last name"
                placeholder="Last name"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Field
                control={Input}
                label="Preferred Name"
                placeholder="Preferred Name"
                value={otherName}
                onChange={(event) => setOtherName(event.target.value)}
              />
              <Form.Field
                control={Input}
                label="Date of Birth"
                placeholder="Date of Birth"
                value={dob}
                onChange={(event) => setDob(event.target.value)}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field
                control={Input}
                label="Street"
                placeholder="Street"
                onChange={(event) => setStreet(event.target.value)}
              />
              <Form.Field
                control={Input}
                label="City"
                placeholder="City"
                onChange={(event) => setCity(event.target.value)}
              />
              <Form.Field
                control={Input}
                label="State"
                placeholder="State"
                onChange={(event) => setState(event.target.value)}
              />
              <Form.Field
                control={Input}
                label="Zip code"
                placeholder="Zip code"
                onChange={(event) => setZipCode(parseInt(event.target.value))}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field
                control={Input}
                label="Home phone"
                placeholder="Home phone"
                onChange={(event) => setHomePhone(parseInt(event.target.value))}
              />
              <Form.Field
                control={Input}
                label="Work phone"
                placeholder="Work phone"
                onChange={(event) => setWorkPhone(parseInt(event.target.value))}
              />
              <Form.Field
                control={Input}
                label="Cell phone"
                placeholder="Cell phone"
                onChange={(event) => setCellPhone(parseInt(event.target.value))}
              />
              <Form.Field
                control={Input}
                label="Email"
                type="email"
                placeholder="Email"
                onChange={(event) => setEmail(event.target.value)}
              />
            </Form.Group>
            <p>
              <b>Your Company's Information (OPTIONAL)</b>
            </p>
            <Form.Group widths="equal">
              <Form.Field
                control={Input}
                label="Company name"
                placeholder="Company name"
                onChange={(e) => setCompanyName(e.target.value)}
              />
              <Form.Field
                control={Input}
                label="Company website"
                type="url"
                placeholder="Company website"
                onChange={(e) => setWebsite(e.target.value)}
              />
            </Form.Group>
            <Button onClick={() => createAccount()}>Create Account</Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </Form>
        </Segment>
      </TransitionablePortal>

      <Snackbar snackbar={snackbar} setSnackBar={setSnackBar} />
    </div>
  );
};

export default Register;
