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

const FileUploadComponent = props => {
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("");
  const [showProgress, setShowProgress] = useState(false);
  const [percent, setPercent] = useState(0);
  const [btnColor, setBtnColor] = useState(["red", "Cancel", "Uploading File. Please wait..."]);

  const getFile = e => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const Upload = () => {
    if (file) {
      setShowProgress(true);
      if (props.listOfFiles.length === 0) {
        props.listOfFiles.push(fileName);
      } else {
        props.listOfFiles.unshift(fileName);
        
      }
      setPercent(100)   
    }
  };

  useEffect(() => {
    if (percent === 100) {
      setBtnColor(["green", "Done!", "Uploaded Successfully"]);
    }
  }, [percent])

  const onCompleteListener = () => {
    setShowProgress(false);
    props.setOpenModal(false);
  };

  const closePortal = () => {
    setShowProgress(false);
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
                <Button basic color="green" inverted onClick={Upload}>
                  Upload
                </Button>
              </div>
            </Grid.Row>
          </Grid>

          <TransitionablePortal
            onClose={closePortal}
            className="center"
            open={showProgress}>
            <Segment inverted
              style={{
                left: "20%",
                position: "fixed",
                top: "50%",
                zIndex: 1000,
              }}
            >
              <div>
                <div className="center">
                  <h3 align="center">{btnColor[2]}</h3>
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
                    color={btnColor[0]}
                     inverted
                    floated='right'           
                    onClick={closePortal}>
                    {btnColor[1]} 
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
