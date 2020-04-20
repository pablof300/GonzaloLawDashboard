import React, { useState } from "react";
import { Button, Form, Input, Modal, Divider } from "semantic-ui-react";
import { updateClientInfoById } from "../../../api/AdminApi";
import "../../client/FileComponent/FileComponent.css";
import Snackbar from "../../../Snackbar";

function EditClient(props) {
  const [username, setUsername] = useState(
    !(props.clientData && props.clientData.username)
      ? null
      : props.clientData.username
  );
  const [password, setPassword] = useState(
    !(props.clientData && props.clientData.password)
      ? null
      : props.clientData.password
  );
  const [firstName, setFirstName] = useState(
    !(props.clientData && props.clientData.firstName)
      ? null
      : props.clientData.firstName
  );
  const [middleName, setMiddleName] = useState(
    !(props.clientData && props.clientData.middleName)
      ? null
      : props.clientData.middleName
  );
  const [lastName, setLastName] = useState(
    !(props.clientData && props.clientData.secondName)
      ? null
      : props.clientData.secondName
  );
  const [otherName, setOtherName] = useState(
    !(props.clientData && props.clientData.otherName)
      ? null
      : props.clientData.otherName
  );
  const [street, setStreet] = useState(
    !(props.clientData && props.clientData.address)
      ? null
      : props.clientData.address.street
  );
  const [city, setCity] = useState(
    !(props.clientData && props.clientData.address)
      ? null
      : props.clientData.address.city
  );
  const [state, setState] = useState(
    !(props.clientData && props.clientData.address)
      ? null
      : props.clientData.address.state
  );
  const [zipCode, setZipCode] = useState(
    !(props.clientData && props.clientData.address)
      ? null
      : props.clientData.address.zip
  );
  const [homePhone, setHomePhone] = useState(
    !(props.clientData && props.clientData.contact)
      ? null
      : props.clientData.contact.homePhone
  );
  const [workPhone, setWorkPhone] = useState(
    !(props.clientData && props.clientData.contact)
      ? null
      : props.clientData.contact.workPhone
  );
  const [cellPhone, setCellPhone] = useState(
    !(props.clientData && props.clientData.contact)
      ? null
      : props.clientData.contact.cellPhone
  );
  const [email, setEmail] = useState(
    !(props.clientData && props.clientData.contact)
      ? null
      : props.clientData.contact.email
  );
  const [companyName, setCompanyName] = useState(
    !(props.clientData && props.clientData.company)
      ? null
      : props.clientData.company.companyName
  );
  const [website, setWebsite] = useState(
    !(props.clientData && props.clientData.company)
      ? null
      : props.clientData.company.website
  );
  const [dob, setDob] = useState(
    !(props.clientData && props.clientData.birthDate)
      ? null
      : props.clientData.birthDate
  );
  const [snackbar, setSnackBar] = useState({
    enable: false,
    message: "Success",
    type: "success",
    color: "green",
  });

  const updateClientInfo = async () => {
    const data = {
      username: username,
      firstName: firstName,
      secondName: lastName,
      middleName: middleName,
      otherName: otherName,
      address: {
        street: street,
        city: city,
        state: state,
        zip: zipCode,
      },
      company: {
        companyName: companyName,
        website: website,
        companyLogoUrl: !(props.clientData && props.clientData.company)
          ? ""
          : props.clientData.company.companyLogoUrl,
      },
      contact: {
        homePhone: homePhone,
        workPhone: workPhone,
        cellPhone: cellPhone,
        email: email,
      },
      birthDate: dob,
    };
    const updated = await updateClientInfoById(props.clientData._id, data);
    if (updated.ok) {
      props.setEditClient(false);
      setSnackBar({
        enable: true,
        message: "Client's Information updated successfully. Please wait...",
        type: "checkmark",
        color: "green",
      });
      setTimeout(() => {
        RefreshPage();
      },1900)
      
    }else{
      setSnackBar({
        enable: true,
        message: "Failed to update Client Information",
        type: "warning",
        color: "red",
      });
    }
  };

  const RefreshPage = () => {
    window.location.reload(false);
  };
  function handleCancel() {
    props.setEditClient(false);
  }

  return (
    <div>
      <Modal open={props.editClient} size="large">
        <Modal.Content>
          <h2>Edit Client Information</h2>
          <Divider />
          <Form>
            <p>
              <b>Client's Personal Information</b>
            </p>
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
                disabled={true}
                value={password}
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
                value={street}
                onChange={(event) => setStreet(event.target.value)}
              />
              <Form.Field
                control={Input}
                label="City"
                placeholder="City"
                value={city}
                onChange={(event) => setCity(event.target.value)}
              />
              <Form.Field
                control={Input}
                label="State"
                placeholder="State"
                value={state}
                onChange={(event) => setState(event.target.value)}
              />
              <Form.Field
                control={Input}
                label="Zip code"
                placeholder="Zip code"
                value={zipCode}
                onChange={(event) => setZipCode(parseInt(event.target.value))}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field
                control={Input}
                label="Home phone"
                placeholder="Home phone"
                value={homePhone}
                onChange={(event) => setHomePhone(parseInt(event.target.value))}
              />
              <Form.Field
                control={Input}
                label="Work phone"
                placeholder="Work phone"
                value={workPhone}
                onChange={(event) => setWorkPhone(parseInt(event.target.value))}
              />
              <Form.Field
                control={Input}
                label="Cell phone"
                placeholder="Cell phone"
                value={cellPhone}
                onChange={(event) => setCellPhone(parseInt(event.target.value))}
              />
              <Form.Field
                control={Input}
                label="Email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Form.Group>
            <p>
              <b>Client's Company Information (OPTIONAL)</b>
            </p>
            <Form.Group widths="equal">
              <Form.Field
                control={Input}
                label="Company name"
                placeholder="Company name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
              <Form.Field
                control={Input}
                label="Company website"
                type="url"
                value={website}
                placeholder="Company website"
                onChange={(e) => setWebsite(e.target.value)}
              />
            </Form.Group>
            <Button color="green" onClick={updateClientInfo}>
              Update Client Information
            </Button>
            <Button color="black" onClick={handleCancel}>
              Cancel
            </Button>
          </Form>
        </Modal.Content>
      </Modal>
      <Snackbar snackbar={snackbar} setSnackBar={setSnackBar} />
    </div>
  );
}

export default EditClient;
