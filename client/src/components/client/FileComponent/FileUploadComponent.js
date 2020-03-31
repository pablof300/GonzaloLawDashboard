import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Header,
  Input,
  Progress,
  Grid,
  GridRow,
  Segment,
  TransitionablePortal
} from "semantic-ui-react";
import axios from "axios";
import { getCurrentUser } from "../../../api/UserApi";
import Cookies from "js-cookie";

const FileUploadComponent = props => {
  const [file, setFile] = useState(null);
  const [showUploadProgress, setShowUploadProgress] = useState(false);
  const [percent, setPercent] = useState(0);
  const [userID, setUserID] = useState(null);
  const [gotUserID, setGotUserID] = useState(false);
  const [portalProp, setPortalProp] = useState({
    color: "red",
    buttonText: "Cancel",
    text: "Uploading File. Please wait..."
  });

  const getFile = e => {
    e.preventDefault();
    setFile(e.target.files);
  };

  const getUserData = async () => {
    const user = (await getCurrentUser()).data;
    setUserID(user._id);
    setGotUserID(true);
  };

  if (!gotUserID) {
    getUserData();
  }

  const getFileSize = fileSize => {
    const gb = 10e8,
      mb = 10e5,
      kb = 10e2;
    let result;
    if (fileSize >= gb) {
      result = (fileSize / gb).toFixed(2) + " GB";
    } else if (fileSize >= mb) {
      result = (fileSize / mb).toFixed(2) + " MB";
    } else if (fileSize >= kb) {
      result = (fileSize / kb).toFixed(2) + " KB";
    } else {
      result = fileSize.toFixed(2) + " bytes";
    }
    return result;
  };

  const upload = () => {
    if (file) {
      setShowUploadProgress(true);
      const i = 0;
      let fileParts = file[i].name.split(".");
      let size = file[i].size;
      const fileName = fileParts[0];
      const fileType = fileParts[1];
      const fileSize = getFileSize(size);

      setPortalProp({
        color: "red",
        buttonText: "Cancel",
        text: `Uploading "${fileName}". Please wait...`
      });
      console.log("Preparing to upload file");
      axios
        .post("/fileAws", {
          fileName: fileName,
          fileType: fileType
        })
        .then(response => {
          let returnData = response.data.data.returnData;
          let signedRequest = returnData.signedRequest;
          const url = returnData.url;
          let options = {
            headers: {
              "Content-Type": fileType
            },
            onUploadProgress: progressEvent => {
              setPercent(
                parseInt(
                  Math.round((progressEvent.loaded * 100) / progressEvent.total)
                )
              );
            }
          };

          axios
            .put(signedRequest, file[i], options)
            .then(result => {
              console.log("We got response from s3");

              const postFileInDatabase = async () => {
                const fileToStore = {
                  name: fileName,
                  type: fileType,
                  size: fileSize,
                  url: url
                };
                axios
                  .post("/files", fileToStore, {
                    headers: { Authorization: `Bearer ${Cookies.get("jwt")}` }
                  })
                  .then(res => {
                    setPortalProp({
                      color: "green",
                      buttonText: "Done!",
                      text: "Uploaded Successfully"
                    });
                    props.setIsFilesPopulated(false);
                  });
              };
              postFileInDatabase();
            })
            .catch(error => {
              alert("ERROR: " + JSON.stringify(error));
            });
        })
        .catch(error => {
          alert(JSON.stringify(error));
        });
    }
  };

  const closePortal = () => {
    setShowUploadProgress(false);
    setPortalProp({
      color: "red",
      buttonText: "Cancel",
      text: "Uploading File. Please wait..."
    });
    setPercent(0);
  };

  return (
    <div>
      <Modal open={props.openModal} basic size="small">
        <Header icon="upload" content="Upload a new file" />
        <Modal.Content>
          <Input icon type="file" id="fileUpload" onChange={getFile}></Input>
        </Modal.Content>
        <Modal.Actions>
          <Grid columns={1}>
            <Grid.Row>
              <div className="actions">
                <Button
                  basic
                  color="red"
                  inverted
                  onClick={() => props.setOpenModal(false)}
                >
                  Cancel
                </Button>
                <Button basic color="green" inverted onClick={upload}>
                  Upload
                </Button>
              </div>
            </Grid.Row>
          </Grid>

          <TransitionablePortal
            onClose={closePortal}
            className="center"
            open={showUploadProgress}
          >
            <Segment
              inverted
              style={{
                left: "20%",
                position: "fixed",
                top: "50%",
                zIndex: 1000
              }}
            >
              <div>
                <div className="center">
                  <h3 style={{ textTransform: "capitalize" }} align="center">
                    {portalProp["text"]}
                  </h3>
                </div>

                <div>
                  <Progress
                    className="progress"
                    size="medium"
                    color="blue"
                    autoSuccess
                    active
                    inverted
                    percent={percent}
                    indicating
                    progress
                  />

                  <Button
                    color={portalProp["color"]}
                    inverted
                    floated="right"
                    onClick={closePortal}
                  >
                    {portalProp["buttonText"]}
                  </Button>
                </div>
              </div>
            </Segment>
          </TransitionablePortal>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default FileUploadComponent;
