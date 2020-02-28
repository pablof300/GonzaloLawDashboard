import React, { useState } from "react";
import {
  Button,
  Modal,
  Header,
  Input,
  Progress,
  Grid,
  GridRow
} from "semantic-ui-react";

const FileUploadComponent = props => {
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("");
  const [showProgress, setShowProgress] = useState("hidden");
  const [percent, setpercent] = useState(0);

  const getFile = e => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const Upload = () => {
    setShowProgress("");
    let mfilesCopy = [];
    if (file) {
      if (props.listOfFiles.length === 0) {
        mfilesCopy.push(fileName);
      } else {
        mfilesCopy = props.listOfFiles;
        mfilesCopy.unshift(fileName);
      }
      let n = 0,
        m = 0,
        o = 0,
        p = 1;
      while (n < 3000000) {
        while (m < 300000000) {
          while (o < 30000000) {
            o++;
          }
          m++;
        }
        n++;
        if (n === 30000 * p) {
          p++;
          setpercent(p);
        }
      }

      if (percent === 100) {
        props.setListOfFiles(mfilesCopy);
        props.setOpenModal(false);
      }
    }
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
                <Button color="green" inverted onClick={Upload}>
                  Upload
                </Button>
              </div>
            </Grid.Row>
            <Grid.Row style={{ marginTop: 20 }}>
              <div className={showProgress ? "hidden" : ""}>
                <Progress
                  className="progress"
                  size="medium"
                  color="blue"
                  autoSuccess
                  active
                  percent={percent}
                  indicating
                  inverted
                  progress
                />
              </div>
            </Grid.Row>
          </Grid>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default FileUploadComponent;
