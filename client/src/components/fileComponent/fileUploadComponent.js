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
    fileType:"",
    fileSize: ""
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
    let size = e.target.files[0].size
   // console.log(size)
    setFileAttr({
      fileName: fileParts[0],
      fileType: fileParts[1],
      fileSize: getFileSize(size)
    })
  };

  const getFileSize = (fileSize) => {
    const gb = 10e8, mb = 10e5, kb = 10e2;
    let result;
    if(fileSize >= gb){
      result  = (fileSize/gb).toFixed(2)  + " GB";
    }else if(fileSize >= mb){
      result  = (fileSize/mb).toFixed(2)  + " MB";
    }else if(fileSize >= kb){
      result  = (fileSize/kb).toFixed(2) + " KB";
    }else{
        result = fileSize.toFixed(2) + " bytes"
    }
    return result;
  }

  const upload = () => {
    if (file) {
      setShowUploadProgress(true);
      console.log("Preparing to upload file")
      axios.post("http://localhost:5000/fileUpload", {

        fileName: fileAttr["fileName"],
        fileType: fileAttr["fileType"]
      })
      .then(response => {
        let returnData = response.data.data.returnData;
        let signedRequest = returnData.signedRequest;
        console.log(returnData)
        let url = returnData.url;
        console.log("Received signed request " + signedRequest)
        console.log(url)
        setOnCompleteListener({ url: url });
        let options = {
          headers: {
            'Content-Type': fileAttr["fileType"]
          },
          onUploadProgress : progressEvent => {
            setPercent(parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total)))
          } 
        }

        axios.put(signedRequest, file, options).then(result => {
          console.log("We got response from s3")
          console.log(result)
          setOnCompleteListener({ success: true });
          let index, size;
          index = size = props.listOfFiles.length;
          let fileToStore = {
            "name": fileAttr["fileName"],
            "type": fileAttr["fileType"],
            "size": fileAttr["fileSize"],
            "url": onCompleteListener["url"],
            "key": index
          };

          if (size === 0) {
            props.listOfFiles.push(fileToStore);
          } else {
            props.listOfFiles.unshift(fileToStore);
          }


        }).catch(error => {
          alert("ERROR: " + JSON.stringify(error))
        })      
      })
      .catch(error => {
        alert(JSON.stringify(error));
      });
 
    }
  };

  useEffect(() => {
    if (onCompleteListener["success"]) {
      
      setPortalProp({
        color: "green",
        buttonText: "Done!",
        text: "Uploaded Successfully"
      });
    }
  }, [onCompleteListener["success"]]);

  const closePortal = () => {
    setShowUploadProgress(false);
    setPortalProp({
        color: "red",
        buttonText: "Cancel",
        text: "Uploading File. Please wait..."
      
    })
    setOnCompleteListener({
      success: false,
      url: ""
    })
    setPercent(0)
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
