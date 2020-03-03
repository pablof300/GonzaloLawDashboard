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
import axios from 'axios';

const FileUploadComponent = props => {
  const [file, setFile] = useState("");
  const [fileAttr, setFileAttr] = useState({
    fileName: "",
    fileType:""
  });
  const [showUploadProgress, setShowUploadProgress] = useState(false);
  const [percent, setPercent] = useState(0);
  const [portalProp, setPortalProp] = useState({
    color: "red",
    buttonText: "Cancel",
    text: "Uploading File. Please wait..."
  });
  const [onCompleteListener, setOnCompleteListener] = useState({
    success: false,
    url: ""
  });

  const getFile = e => {
    e.preventDefault();
    setFile(e.target.files[0]);
    let fileParts = e.target.files[0].name.split(".");
    setFileAttr({
      fileName: fileParts[0],
      fileType: fileParts[1]
    })
  };

  const upload = () => {
    if (file) {
      setShowUploadProgress(true);
      axios.post("/fileUpload", file, {
        headers: {
          'Content-Type': fileAttr["fileType"]
        },
        onUploadProgress : progressEvent => {
          setPercent(parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total)))
        } 
      })
      .then(response => {
        let returnData = response.data;
        console.log(returnData)
        let url = returnData.url;

        setOnCompleteListener({
          success: true, 
          url: url
        });

        console.log(url)
       
      })
      .catch(error => {
        alert(JSON.stringify(error));
      });
 
    }
  };

  useEffect(() => {
    if (onCompleteListener["success"]) {
      if (props.listOfFiles.length === 0) {
        props.listOfFiles.push(fileAttr["fileName"]);
        console.log(fileAttr["fileName"])
      } else {
        props.listOfFiles.unshift(fileAttr["fileName"]);
      }
      setPortalProp({
        color: "green",
        buttonText: "Done!",
        text: "Uploaded Successfully"
      });
    }
  }, [onCompleteListener["success"]]);

  const closePortal = () => {
    setShowUploadProgress(false);
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
                  <h3 align="center">{portalProp["text"]}</h3>
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
