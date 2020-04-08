import React, { useState } from "react";
import {
  Card,
  Grid,
  Popup,
  Image,
  Form,
  Button,
  Modal,
  Label,
  Dimmer,
  Loader,
  Segment,
} from "semantic-ui-react";
import "../FileComponent/FileComponent.css";
import {
  getCurrentUser,
  uploadUserProfilePicture,
  updatePassword,
  sendEmail,
  checkIfCodeExistOrHasNotExpired,
} from "../../../../src/api/UserApi";

const defaultImage = "https://react.semantic-ui.com/images/wireframe/image.png";

const MyAccount = () => {
  const [userData, setUserData] = useState([]);
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const [changePass, setChangePass] = useState(false);
  const [currPassword, setCurrPassword] = useState(null);
  const [currPasswordError, setCurrPasswordError] = useState(false);
  const [newPassword, setNewPassword] = useState(null);
  const [newPasswordErrorMessage, setNewPasswordErrorMessage] = useState(null);
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [confirmNewPassword, setConfirmNewPassword] = useState(null);
  const [confirmNewPasswordError, setConfirmNewPasswordError] = useState(false);
  const [clearErrors, setClearErrors] = useState(false);
  const [openCodeDialog, setOpenCodeDialog] = useState(false);
  const [verifyCode, setVerifyCode] = useState(false);
  const [verifyError, setVerifyError] = useState(false);
  const [code, setCode] = useState(null);
  const [logoUrl, setLogoUrl] = useState(null);
  const [hasCompany, setHasCompany] = useState(false);

  const loadUserData = async () => {
    const user = (await getCurrentUser()).data;
    if (user) {
      setUserData(user);
      if (user.company) {
        setHasCompany(true);
      }
      setIsUserLoaded(true);
    }
  };
  if (!isUserLoaded) {
    loadUserData();
  }

  const checkImageType = (fileType) => {
    if (fileType === "png" || fileType === "jpeg" || fileType === "jpg") {
      return true;
    }
    return false;
  };

  const resetPass = async () => {
    if (userData && userData.contact && userData.contact.email) {
      setOpenCodeDialog(true);
      const toEmail = userData.contact.email;
      const mailOptions = {
        from: "michaelbrown7899@gmail.com",
        to: toEmail,
        subject: "Reset Password",
        html: "",
      };
      await sendEmail(mailOptions);
    }
  };

  function hasNumber(pass) {
    return /\d/.test(pass);
  }

  const savePassword = async () => {
    const currPass = userData.password;
    if (currPassword && newPassword && confirmNewPassword) {
      if (newPassword.length >= 8) {
        if (hasNumber(newPassword)) {
          if (newPassword === confirmNewPassword) {
            if (currPass === currPassword) {
              const params = {
                password: newPassword,
              };
              const changed = await updatePassword(params);
              if (changed) {
                setChangePass(false);
                setCurrPasswordError(false);
                setConfirmNewPasswordError(false);
                setClearErrors(false);
                setVerifyCode(false);
                setConfirmNewPassword(null);
                setCurrPassword(null);
                setNewPassword(null);
                alert("Password changed successfully");
              }
            } else {
              setClearErrors(false);
              setCurrPasswordError(true);
            }
          } else {
            setClearErrors(false);
            setConfirmNewPasswordError(true);
          }
        } else {
          setClearErrors(false);
          setNewPasswordError(true);
          setNewPasswordErrorMessage("Password must contain at least a number");
        }
      } else {
        setClearErrors(false);
        setNewPasswordError(true);
        setNewPasswordErrorMessage(
          "Password should not be less than 8 characters"
        );
      }
    } else {
      alert("All fields are mandatory");
    }
  };

  const currPass = (e) => {
    e.preventDefault();
    if (!clearErrors) {
      setCurrPasswordError(false);
      setConfirmNewPasswordError(false);
      setNewPasswordError(false);
      setClearErrors(true);
    }

    setCurrPassword(e.target.value);
  };

  const getLogoUrl = (e) => {
    e.preventDefault();
  };

  const newPass = (e) => {
    e.preventDefault();
    if (!clearErrors) {
      setCurrPasswordError(false);
      setConfirmNewPasswordError(false);
      setNewPasswordError(false);
      setClearErrors(true);
    }
    setNewPassword(e.target.value);
  };

  const newConfirmPass = (e) => {
    e.preventDefault();
    if (!clearErrors) {
      setCurrPasswordError(false);
      setConfirmNewPasswordError(false);
      setNewPasswordError(false);
      setClearErrors(true);
    }
    setConfirmNewPassword(e.target.value);
  };

  const checkCode = async () => {
    if (userData && code) {
      const res = await checkIfCodeExistOrHasNotExpired(code, userData._id);
      console.log(res);
      if (res) {
        setVerifyCode(true);
        setOpenCodeDialog(false);
        setVerifyError(false);
        setCode(null)
        setCurrPassword(userData.password);
      } else {
        setVerifyCode(false);
        setVerifyError(true);
      }
    }
  };

  const handlePassCancel = () => {
    setChangePass(false);
    setCurrPasswordError(false);
    setConfirmNewPasswordError(false);
    setNewPasswordError(false);
    setVerifyCode(false);
    setNewPasswordErrorMessage(null);
    setConfirmNewPassword(null);
    setCurrPassword(null);
    setNewPassword(null);
  };

  const getFile = (e) => {
    e.preventDefault();
    const file = e.target.files;
    if (file && userData) {
      let fileParts;
      if (file[0].name) {
        fileParts = file[0].name.split(".");
      }
      const fileName = fileParts[0];
      const fileType = fileParts[1];
      if (checkImageType(fileType.toLowerCase())) {
        const params = {
          fileName: fileName,
          fileType: fileType,
          file: file,
          userID: userData._id,
        };
        uploadUserProfilePicture(params);
      } else {
        alert("ERROR: Please upload a valid image");
      }
    } else {
      alert("ERROR: Either the file is corrupted or no user is logged in.");
    }
  };

  const handleDialogCancel = () => {
    setOpenCodeDialog(false)
    setVerifyError(true);
    setCode(null)
  }

  const getCode = (e) => {
    e.preventDefault();
    setVerifyError(false)
    setCode(e.target.value);
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
                src={
                  !(userData && userData.imageUrl)
                    ? defaultImage
                    : userData.imageUrl
                }
                size="huge"
                rounded
                fluid
              />
              <Popup
                content="Click to Change Profile Picture"
                position="top center"
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
                      className={
                        !(userData && userData.middleName) ? "hidden" : ""
                      }
                      label="Middle name"
                      labelPosition="left"
                      placeholder="Middle name"
                      readOnly
                      value={!userData ? "" : userData.middleName}
                    />
                    <Form.Input
                      className={
                        !(userData && userData.otherName) ? "hidden" : ""
                      }
                      label="Other name"
                      placeholder="Other name"
                      labelPosition="left"
                      readOnly
                      value={!userData ? "" : userData.otherName}
                    />
                  </Form.Group>

                  <Form.Input
                    className={
                      !(userData && userData.birthDate) ? "hidden" : "wrap"
                    }
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
                      !(userData && userData.contact)
                        ? null
                        : userData.contact.cellPhone
                    }
                  />

                  <Form.Group className="wrap" unstackable>
                    <Form.Input
                      className={
                        !(userData && userData.workPhone) ? "hidden" : ""
                      }
                      label="Work Phone"
                      labelPosition="left"
                      placeholder="Work Phone"
                      readOnly
                      value={!userData ? "" : userData.workPhone}
                    />
                    <Form.Input
                      className={
                        !(userData && userData.homePhone) ? "hidden" : ""
                      }
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

          <Grid.Row className={!hasCompany ? "hidden" : ""}>
            <h3>Company Information</h3>
          </Grid.Row>
          <Grid.Row className={!hasCompany ? "hidden" : ""}>
            <Grid.Column floated="left" stretched={true}>
              <Grid.Row stretched={true} textAlign="left">
                <Form widths="equal">
                  <Form.Input
                    className="wrap"
                    label="Logo URL"
                    type="text"
                    placeholder="Logo URL"
                    labelPosition="left"
                    value={logoUrl}
                    onChange={getLogoUrl}
                  />
                  <Form.Input
                    className="wrap"
                    label="Company"
                    type="text"
                    placeholder="Company"
                    labelPosition="left"
                    readOnly
                    value={!(userData && userData.company) ? "" : userData.company.companyName}
                  />

                  <Form.Input
                    className="wrap"
                    label="Website"
                    type="text"
                    placeholder="Website"
                    labelPosition="left"
                    readOnly
                    value={!(userData && userData.company) ? "" : userData.company.website}
                  ></Form.Input>
                </Form>
              </Grid.Row>
            </Grid.Column>

            <Grid.Column floated="right" width={5}>
              <p>Company Logo</p>
              <Image
                src={
                  !(userData && userData.company)
                    ? defaultImage
                    : userData.company.companyLogoUrl
                }
                size="huge"
                rounded
                fluid
              />
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
                  value={
                    !(userData && userData.address)
                      ? ""
                      : userData.address.street
                  }
                />
                <Form.Input
                  label="City"
                  placeholder="City"
                  labelPosition="left"
                  readOnly
                  value={
                    !(userData && userData.address) ? "" : userData.address.city
                  }
                />
              </Form.Group>
              <Form.Group className="wrap" unstackable>
                <Form.Input
                  label="State"
                  placeholder="State"
                  labelPosition="left"
                  readOnly
                  value={
                    !(userData && userData.address)
                      ? ""
                      : userData.address.state
                  }
                />
                <Form.Input
                  label="Zip"
                  placeholder="Zip"
                  labelPosition="left"
                  readOnly
                  value={
                    !(userData && userData.address) ? "" : userData.address.zip
                  }
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
                value={
                  !(userData && userData.contact) ? "" : userData.contact.email
                }
              />
            </Form>
          </Grid.Row>

          <Grid.Row>
            <h3>Account Password</h3>
          </Grid.Row>
          <Grid.Row stretched={true} textAlign="left">
            <Popup
              content="Change your current password"
              position="top center"
              trigger={
                <Button
                  onClick={() => setChangePass(true)}
                  content="Change Password"
                  primary
                />
              }
            />
          </Grid.Row>

          <div>
            <Modal open={changePass} size="large">
              <Modal.Header>Change Password</Modal.Header>
              <Modal.Content>
                <Form widths="equal">
                  <Form.Group className="wrap" unstackable>
                    <Form.Field>
                      <Form.Input
                        disabled={verifyCode}
                        label="Current Password"
                        placeholder="Current Password"
                        labelPosition="left"
                        type="password"
                        error={currPasswordError}
                        value={currPassword}
                        onChange={currPass}
                      />
                      <Label
                        className={!currPasswordError ? "invisible" : ""}
                        basic
                        color="red"
                        pointing
                      >
                        Password does not match your current password
                      </Label>
                    </Form.Field>

                    <Form.Field>
                      <Form.Input
                        label="New Password"
                        placeholder="New Password"
                        type="password"
                        error={newPasswordError}
                        labelPosition="left"
                        ondrop="return false;"
                        onpaste="return false;"
                        onChange={newPass}
                        value={newPassword}
                      />
                      <Label
                        className={!newPasswordError ? "invisible" : ""}
                        basic
                        color="red"
                        pointing
                      >
                        {newPasswordErrorMessage}
                      </Label>
                    </Form.Field>

                    <Form.Field>
                      <Form.Input
                        label="Confirm New Password"
                        type="password"
                        ondrop="return false;"
                        onpaste="return false;"
                        placeholder="Confirm New Password"
                        labelPosition="left"
                        error={confirmNewPasswordError}
                        onChange={newConfirmPass}
                        value={confirmNewPassword}
                      />
                      <Label
                        className={!confirmNewPasswordError ? "invisible" : ""}
                        basic
                        color="red"
                        pointing
                      >
                        Password do not match
                      </Label>
                    </Form.Field>
                  </Form.Group>
                  <Button
                    onClick={savePassword}
                    content="Save Password"
                    primary
                  />
                  <Button onClick={handlePassCancel} content="Cancel" primary />

                  <Popup
                    content="An email will be sent to you to reset your Password"
                    position="top center"
                    trigger={
                      <Button
                        floated="right"
                        style={{ marginLeft: 30 }}
                        onClick={resetPass}
                        content="Forgot Password?"
                        primary
                      />
                    }
                  />
                </Form>
                <Modal.Actions>
                  <div>
                    <Modal open={openCodeDialog} size="small">
                      <Modal.Header>Verify Code</Modal.Header>
                      <Modal.Content>
                        <p>A verification Code has been sent to your email.</p>
                        <Form widths="equal">
                          <Form.Field>
                            <Form.Input
                              label="Code"
                              placeholder="Code"
                              labelPosition="left"
                              focus={true}
                              type="text"
                              value={code}
                              error={verifyError}
                              onChange={getCode}
                            />
                            <Label
                              className={!verifyError ? "invisible" : ""}
                              basic
                              color="red"
                              pointing
                            >
                              Either the code has expired or does not exist
                            </Label>
                          </Form.Field>
                        </Form>
                      </Modal.Content>
                      <Modal.Actions>
                        <Form widths="equal">
                          <Button
                            onClick={checkCode}
                            content="Confirm"
                            primary
                          />
                          <Button
                            onClick={resetPass}
                            content="Resend Code"
                            primary
                          />
                        </Form>
                        <Button
                          floated="right"
                          onClick={handleDialogCancel}
                          content="Cancel"
                          primary
                        />
                      </Modal.Actions>
                    </Modal>
                  </div>
                </Modal.Actions>
              </Modal.Content>
            </Modal>
          </div>
        </Grid>
      </Card>
    </div>
  );
};

export default MyAccount;
