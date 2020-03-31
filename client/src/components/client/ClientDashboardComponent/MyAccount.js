import React, { useState } from "react";
import { Card, Grid, Popup, Image, Form } from "semantic-ui-react";
import "../FileComponent/FileComponent.css";
import {
  getCurrentUser,
  uploadUserProfilePicture
} from "../../../../src/api/UserApi";

const defaultImage = "https://react.semantic-ui.com/images/wireframe/image.png";

const MyAccount = () => {
  const [userData, setUserData] = useState([]);
  const [isUserLoaded, setIsUserLoaded] = useState(false);

  const loadUserData = async () => {
    const user = (await getCurrentUser()).data;
    setUserData(user);
    setIsUserLoaded(true);
  };
  if (!isUserLoaded) {
    loadUserData();
  }

  const checkImageType = fileType => {
    if (fileType === "png" || fileType === "jpeg" || fileType === "jpg") {
      return true;
    }
    return false;
  };

  const getFile = e => {
    e.preventDefault();
    const file = e.target.files;
    let fileParts;
    if (file[0] && file[0].name) {
      fileParts = file[0].name.split(".");
    }
    const fileName = fileParts[0];
    const fileType = fileParts[1];
    if (checkImageType(fileType.toLowerCase())) {
        uploadUserProfilePicture(fileName, fileType, file);
    } else {
      alert("ERROR: Please upload a valid image");
    }
  };

  return (
    <div>
      <Card unstackable fluid centered>
        <Grid
          unstackable
          padded="vertically"
          divided="vertically"
          style={{ margin: 30 }}
        >
          <Grid.Row>
            <h3>Personal Information</h3>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={4}>
              <Image
                src={!userData.imageUrl ? defaultImage : userData.imageUrl}
                size="huge"
                rounded
                fluid
              />
              <Popup
                content="Click to Change Profile Picture"
                position='top center'
                trigger={
                  <div style={{ marginTop: 20 }}>
                    <label for="file" class="ui icon button">
                      Upload
                    </label>
                    <input
                      onChange={getFile}
                      type="file"
                      id="file"
                      style={{ display: "none" }}
                    />
                  </div>
                }
              />
            </Grid.Column>

            <Grid.Column stretched={true}>
              <Grid.Row stretched={true} textAlign="left">
                <Form widths="equal">
                  <Form.Group className="wrap" unstackable>
                    <Form.Input
                      label="First name"
                      placeholder="First name"
                      labelPosition="left"
                      readOnly
                      value={!userData ? "" : userData.firstName}
                    />
                    <Form.Input
                      label="Last name"
                      placeholder="Last name"
                      labelPosition="left"
                      readOnly
                      value={!userData ? "" : userData.secondName}
                    />
                  </Form.Group>

                  <Form.Group className="wrap" unstackable>
                    <Form.Input
                      className={!userData.middleName ? "hidden" : ""}
                      label="Middle name"
                      labelPosition="left"
                      placeholder="Middle name"
                      readOnly
                      value={!userData ? "" : userData.middleName}
                    />
                    <Form.Input
                      className={!userData.otherName ? "hidden" : ""}
                      label="Other name"
                      placeholder="Other name"
                      labelPosition="left"
                      readOnly
                      value={!userData ? "" : userData.otherName}
                    />
                  </Form.Group>

                  <Form.Input
                    className={!userData.birthDate ? "hidden" : "wrap"}
                    label="Birth Date"
                    labelPosition="left"
                    placeholder="mm/dd/yy"
                    readOnly
                    value={!userData ? "" : userData.birthDate}
                  />
                  <Form.Input
                    className="wrap"
                    label="Username"
                    labelPosition="left"
                    placeholder="Username"
                    readOnly
                    value={!userData ? "" : userData.username}
                  />

                  <Form.Input
                    className="wrap"
                    label="Phone Number"
                    labelPosition="left"
                    placeholder="Phone Number"
                    readOnly
                    value={
                      !userData.contact ? null : userData.contact.cellPhone
                    }
                  />

                  <Form.Group className="wrap" unstackable>
                    <Form.Input
                      className={!userData.workPhone ? "hidden" : ""}
                      label="Work Phone"
                      labelPosition="left"
                      placeholder="Work Phone"
                      readOnly
                      value={!userData ? "" : userData.workPhone}
                    />
                    <Form.Input
                      className={!userData.homePhone ? "hidden" : ""}
                      label="Home Phone"
                      placeholder="Home Phone"
                      labelPosition="left"
                      readOnly
                      value={!userData ? "" : userData.homePhone}
                    />
                  </Form.Group>
                </Form>
              </Grid.Row>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <h3>Address</h3>
          </Grid.Row>

          <Grid.Row stretched={true} textAlign="left">
            <Form widths="equal">
              <Form.Group className="wrap" unstackable>
                <Form.Input
                  label="Street"
                  placeholder="Street"
                  labelPosition="left"
                  readOnly
                  value={!userData.address ? "" : userData.address.street}
                />
                <Form.Input
                  label="City"
                  placeholder="City"
                  labelPosition="left"
                  readOnly
                  value={!userData.address ? "" : userData.address.city}
                />
              </Form.Group>
              <Form.Group className="wrap" unstackable>
                <Form.Input
                  label="State"
                  placeholder="State"
                  labelPosition="left"
                  readOnly
                  value={!userData.address ? "" : userData.address.state}
                />
                <Form.Input
                  label="Zip"
                  placeholder="Zip"
                  labelPosition="left"
                  readOnly
                  value={!userData.address ? "" : userData.address.zip}
                />
              </Form.Group>
            </Form>
          </Grid.Row>

          <Grid.Row>
            <h3>Email</h3>
          </Grid.Row>
          <Grid.Row stretched={true} textAlign="left">
            <Form widths="equal">
              <Form.Input
                className="wrap"
                label="Email"
                labelPosition="left"
                placeholder="Email"
                readOnly
                value={!userData.contact ? "" : userData.contact.email}
              />
            </Form>
          </Grid.Row>
        </Grid>
      </Card>
    </div>
  );
};

export default MyAccount;
