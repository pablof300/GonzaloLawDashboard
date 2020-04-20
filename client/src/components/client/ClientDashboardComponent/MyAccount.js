import React, { useState, useEffect } from "react";
import {
  Card,
  Grid,
  Popup,
  Image,
  Form,
  Button,
  Modal,
  Label,
  Transition,
  TransitionablePortal,
  Dimmer,
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
import Snackbar from "../../../Snackbar";
import "../../../Snackbar.css";

const defaultImage = "https://react.semantic-ui.com/images/wireframe/image.png";

const MyAccount = (props) => {
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
  const [snackbar, setSnackBar] = useState({
    enable: false,
    message: "Success",
    type: "success",
    color: "green",
  });

  const loadUserData = async () => {
    const user = (await getCurrentUser()).data;
    if (user) {
      setUserData(user);
      setIsUserLoaded(true);
      props.setIsLoading(false);
    }
  };
  if (!isUserLoaded) {
    props.setIsLoading(true);
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
        to: toEmail,
        from: "",
        subject: "Reset Password",
        html: "",
      };
      await sendEmail(mailOptions, userData._id, userData.firstName);
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
                handlePassCancel();
                setSnackBar({
                  enable: true,
                  message: "Password changed successfully",
                  type: "checkmark",
                  color: "green",
                });
              } else {
                setSnackBar({
                  enable: true,
                  message: "An error occurred. Try again.",
                  type: "warning",
                  color: "red",
                });
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
      setSnackBar({
        enable: true,
        message: "All fields are mandatory",
        type: "warning sign",
        color: "red",
      });
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
      if (res) {
        setVerifyCode(true);
        setOpenCodeDialog(false);
        setVerifyError(false);
        setCode(null);
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

  const getFile = async (e) => {
    e.preventDefault();
    const file = e.target.files;
    if (file && userData) {
      let fileParts;
      if (file[0] && file[0].name) {
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
        let callRes;
        const done = await uploadUserProfilePicture(params, callRes);
        if (done && done.ok) {
          setSnackBar({
            enable: true,
            message: "Profile Picture updated successfully. Please wait...",
            type: "checkmark",
            color: "green",
          });
          setTimeout(() => {
            RefreshPage();
          }, 1200);
        } else {
          setSnackBar({
            enable: true,
            message: "An unknown error occurred",
            type: "warning",
            color: "red",
          });
        }
      } else {
        //alert("ERROR: Please upload a valid image");
        setSnackBar({
          enable: true,
          message: "Please upload a valid image",
          type: "warning",
          color: "red",
        });
      }
    } else {
      //alert("ERROR: Either the file is corrupted or no user is logged in.");
      setSnackBar({
        enable: true,
        message: "Either the file is corrupted or no user is logged in",
        type: "warning",
        color: "red",
      });
    }
  };

  const RefreshPage = () => {
    window.location.reload(false);
  };

  const handleDialogCancel = () => {
    setOpenCodeDialog(false);
    setVerifyError(false);
    setCode("");
  };

  const getCode = (e) => {
    e.preventDefault();
    setVerifyError(false);
    setCode(e.target.value);
  };

  return (
    <div>
      <Grid
        unstackable
        textAlign="left"
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
            />
            <Popup
              content="Click to Change Profile Picture"
              position="top left"
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

        <Grid.Row>
          <h3>Address</h3>
        </Grid.Row>

        <Grid.Row stretched={true} textAlign="left">
          <Grid.Column textAlign="left">
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
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <h3>Email</h3>
        </Grid.Row>

        <Grid.Row stretched={true} textAlign="left">
          <Grid.Column textAlign="left">
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
          </Grid.Column>
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

        <div className="center2">
          <Transition visible={changePass} animation="fade" duration={200}>
            <Dimmer.Inner active={changePass} page />
          </Transition>

          <TransitionablePortal
            closeOnDocumentClick={false}
            transition={{ animation: "scale", duration: 300 }}
            open={changePass}
            size="large"
          >
            <Segment
              className="center2"
              style={{
                left: "25%",
                position: "fixed",
                top: "15%",
                zIndex: 1000,
              }}
            >
              <Modal.Header>Change Password</Modal.Header>
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
                      Password does not match your previous
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
            </Segment>
          </TransitionablePortal>
        </div>

        <div>
          <TransitionablePortal
            closeOnDocumentClick={false}
            transition={{ animation: "fade", duration: 300 }}
            open={openCodeDialog}
            size="small"
          >
            <Segment
              className="center2"
              style={{
                left: "25%",
                position: "fixed",
                top: "15%",
                zIndex: 1000,
              }}
            >
              <Modal.Header>Verify Code</Modal.Header>
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
                   style={{marginBottom:10}}
                   basic
                    color="red"
                    pointing
                  >
                    Either the code has expired or does not exist
                  </Label>
                </Form.Field>
              </Form>

              <Modal.Actions>
                <Form widths="equal">
                  <Button onClick={checkCode} content="Confirm" primary />
                  <Button onClick={resetPass} content="Resend Code" primary />
                </Form>
                <Button
                  floated="right"
                  onClick={handleDialogCancel}
                  content="Cancel"
                  primary
                />
              </Modal.Actions>
            </Segment>
          </TransitionablePortal>
        </div>
      </Grid>
      <Snackbar snackbar={snackbar} setSnackBar={setSnackBar} />
    </div>
  );
};

export default MyAccount;
