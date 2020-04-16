import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import {
  getUserByEmail,
  sendEmail,
  checkIfCodeExistOrHasNotExpired,
  updatePasswordAtLogin,
} from "../../api/UserApi";

import "../Login/Login.css";
import {
  Grid,
  Segment,
  Header,
  Button,
  Divider,
  Form,
  Input,
  Image,
  Popup,
  Modal,
  Label,
  Icon,
} from "semantic-ui-react";

function PasswordReset() {
  const [changePass, setChangePass] = useState(false);
  const [successfulPasswordChanged, setSuccessfulPasswordChanged] = useState(false);
  const [openCodeDialog, setOpenCodeDialog] = useState(false);
  const [verifyError, setVerifyError] = useState(false);
  const [code, setCode] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [newPasswordErrorMessage, setNewPasswordErrorMessage] = useState(null);
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [confirmNewPassword, setConfirmNewPassword] = useState(null);
  const [confirmNewPasswordError, setConfirmNewPasswordError] = useState(false);
  const [clearErrors, setClearErrors] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [userData, setUserData] = useState(null);

  if (successfulPasswordChanged) {
    return <Redirect to="/login" />;
  }

  const getCode = (e) => {
    e.preventDefault();
    setCode(e.target.value)
    setVerifyError(false)
  };

  const resetPass = async () => {
    if (email) {
      const res = await getUserByEmail(email);
      if (res.ok) {
        setUserData(res.data);
        setOpenCodeDialog(true);
        const toEmail = email;
        const mailOptions = {
          to: toEmail,
          from: "",
          subject: "Reset Password",
          html: "",
        };
        await sendEmail(mailOptions, res.data._id, res.data.firstName);
      } else {
        setError(true);
      }
    }
  };

  const checkCode = async () => {
    if (userData && code) {
      const res = await checkIfCodeExistOrHasNotExpired(code, userData._id);
      console.log(res)
      if (res) {
        setVerifyError(false);
        setCode("");
        setChangePass(true)
      } else {
        setVerifyError(true);
      }
    }
  };

  const handleDialogCancel = () => {
    setOpenCodeDialog(false);
    setVerifyError(false)
    setCode("");
  };
  const savePassword = async () => {
    if (newPassword && confirmNewPassword) {
        if (newPassword.length >= 8) {
          if (hasNumber(newPassword)) {
            if (newPassword === confirmNewPassword) {
                const params = {
                    password: newPassword,
                  };
                  const changed = await updatePasswordAtLogin(params, userData._id);
                  if (changed.ok) {
                   handlePassCancel()
                   handleDialogCancel()
                   setSuccessfulPasswordChanged(true)
                    alert("Password changed successfully");
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

  function hasNumber(pass) {
    return /\d/.test(pass);
  }

  function getNewPassword(e){
      e.preventDefault()
      if(!clearErrors){
        setNewPasswordError(false)
        setConfirmNewPasswordError(false)
        setClearErrors(true)
    }
    setNewPassword(e.target.value)
  }

  function getConfirmedPassword(e){
      e.preventDefault()
      if(!clearErrors){
          setNewPasswordError(false)
          setConfirmNewPasswordError(false)
          setClearErrors(true)
      }
    setConfirmNewPassword(e.target.value)
  }

  const handlePassCancel = () => {
      setChangePass(false)
      setNewPassword("")
      setConfirmNewPassword("")
      setClearErrors(false)
      setNewPasswordError(false)
      setConfirmNewPasswordError(false)

  };

  const getEmail = (e) => {
    e.preventDefault()
    setEmail(e.target.value)
    setError(false)

  }

  return (
    <Grid stackable className="container">
      <Grid.Column width={4} />
      <Grid.Column width={8}>
        <Segment padded="very" stacked>
          <Header
            centered
            textAlign="center"
            as="div"
            icon
            style={{ backgroundColor: "white" }}
          >
            <Icon name="lock" fluid style={{ width: "50%" }} />
            <div>
              <h3> Trouble Logging In?</h3>
            </div>
          </Header>
          <Divider hidden />
          <Segment raised color="purple">
            <Form>
              <p>
                Enter your Email and a verification Code will be sent to you to
                help recover your account.
              </p>
              <Form.Field>
                <Form.Input
                  label="Email"
                  placeholder="Email"
                  type="email"
                  error={error}
                  labelPosition="left"
                  onChange={getEmail}
                  value={email}
                />
                <Label
                  className={!error ? "invisible" : ""}
                  basic
                  color="red"
                  pointing
                >
                  Your Email does not match our records
                </Label>
              </Form.Field>
              <Button fluid color="purple" onClick={resetPass}>
                Send Code
              </Button>
            </Form>
          </Segment>
        </Segment>
      </Grid.Column>
      <div>
        <Modal open={openCodeDialog} size="small">
          <Modal.Header>Enter Code</Modal.Header>
          <Modal.Content>
            <p>
              Enter the code we sent to your email to help recover your account
            </p>
            <Form widths="equal">
              <Form.Field>
                <Form.Input
                  label="Code"
                  placeholder="Code"
                  labelPosition="left"
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
              <Button onClick={checkCode} content="Confirm" primary />
              <Button onClick={handleDialogCancel} content="Cancel" primary />
            </Form>
          </Modal.Content>

          <Modal.Actions>
            <div>
              <Modal open={changePass} size="small">
                <Modal.Header>Change Password</Modal.Header>
                <Modal.Content>
                  <Form widths="equal">
                    <Form.Group className="wrap" unstackable>
                      <Form.Field>
                        <Form.Input
                          label="New Password"
                          placeholder="New Password"
                          type="password"
                          error={newPasswordError}
                          labelPosition="left"
                          ondrop="return false;"
                          onpaste="return false;"
                          onChange={getNewPassword}
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
                          onChange={getConfirmedPassword}
                          value={confirmNewPassword}
                        />
                        <Label
                          className={
                            !confirmNewPasswordError ? "invisible" : ""
                          }
                          basic
                          color="red"
                          pointing
                        >
                          Password does not match
                        </Label>
                      </Form.Field>
                    </Form.Group>
                    <Button
                      onClick={savePassword}
                      content="Save Password"
                      primary
                    />
                    <Button
                      onClick={handlePassCancel}
                      content="Cancel"
                      primary
                    />
                  </Form>
                </Modal.Content>
                <Modal.Actions></Modal.Actions>
              </Modal>
            </div>
          </Modal.Actions>
        </Modal>
      </div>
    </Grid>
  );
}

export default PasswordReset;
