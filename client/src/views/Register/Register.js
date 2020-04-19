import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  Label,
  Modal,
} from "semantic-ui-react";
import {registerClient} from '../../api/UserApi'


const Register = (props) =>{
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
    const [dob, setDob] = useState("")
    const [companyName, setCompanyName] = useState("");
    const [website, setWebsite] = useState("");
    const [passwordError, setPasswordError] = useState(null);
    
  const createAccount = async () => {
    console.log("ok this function triggd")
    if (password.length <= 8) {
        setPasswordError("Password must have at least 8 characters");
    }
    else if (!hasNumber(password)) {
        setPasswordError("Password must have at least 1 number");
    }
    else {
    setPasswordError(null);
    let addClientResponse = await registerClient(
        username,
        password,
        firstName,
        lastName,
        middleName,
        otherName,
        street,
        city,
        state,
        zipCode,
        homePhone,
        workPhone,
        cellPhone,
        email,
        dob,
        companyName,
        website,
      );
      console.log(addClientResponse);
    if (addClientResponse.data) {
      alert("Successfully added new client!");
      handleCancel();
    } else {
      alert("Failed to add client, please try again!");
      console.log("Unable to add client");
    }
   
}
  };

  function handleCancel(){
    props.setRegister(false)
    setUsername(null);
    setPassword(null);
    setFirstName(null);
    setMiddleName(null);
    setLastName(null);
    setOtherName(null);
    setStreet(null);
    setCity(null);
    setState(null);
    setZipCode(null);
    setHomePhone(null);
    setWorkPhone(null);
    setCellPhone(null);
    setEmail(null);
    setDob("")
    setCompanyName("");
    setWebsite("");
  }

  function hasNumber(pass) {
    return /\d/.test(pass);
  }
  
  

  return (
      <div>
      <Modal open={props.register} size='large'>
      <Modal.Content>
      <Form>
      <t2><b>Register an account</b></t2>
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            label="Username *"
            placeholder="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <Form.Field
            control={Input}
            label="Password *"
            type='password'
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            
          />
          <Label
            className={!passwordError ? "invisible" : ""}
            basic
            color="red"
            pointing="left"
            >
            {passwordError}
            </Label>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            label="First name *"
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
            label="Last name *"
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
            type='email'
            placeholder="Email"
            onChange={(event) => setEmail(event.target.value)}
          />
        </Form.Group>
        <p><b>Your Company's Information (OPTIONAL)</b></p>
        <Form.Group  widths="equal">
        
        <Form.Field
            control={Input}
            label="Company name"
            placeholder="Company name"
            onChange={(e) => setCompanyName(e.target.value)}
          />
          <Form.Field
            control={Input}
            label="Company website"
            type='url'
            placeholder="Company website"
            onChange={(e) => setWebsite(e.target.value)}
          />
        </Form.Group>
        <Button onClick={() => createAccount()}
            disabled={!username || !password || !firstName || !lastName}
            >Create Account</Button>
        <Button onClick={handleCancel}>Cancel</Button>
      </Form>
    </Modal.Content>
      </Modal>
  
      </div>
  )
}


export default Register;