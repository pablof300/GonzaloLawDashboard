import React, { useState } from "react";
import {
  Button,
  Table,
  Icon,
  Menu,
  Pagination,
  Popup,
  Card,
  Search,
  TransitionablePortal,
  Segment,
  Header
} from "semantic-ui-react";
import "./FileComponent.css";
import FileUploadComponent from "./FileUploadComponent";
import axios from "axios";

// TODO:
// - Refactor confirmDeletion to be by fileId not testFileNamesData

const FileComponent = () => {
  const [listOfFiles, setListOfFiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmDeletion, setConfirmDeletion] = useState({
    enabled: false,
    fileID: null,
    fileName: null
  });

  const [isFilesPopulated, setIsFilesPopulated] = useState(false);

  let itemsPerPage = 5;
  let totalPages;
  let divisible;
  let remainder;
  let startIndex;
  let endIndex;
  let allFileListInPagination = [];

  const loadFiles = async () => {
    const res = await axios.get("http://localhost:5000/files");
    const data = res.data.data;
    let tempfiles = [];
    data.forEach(element => {
      tempfiles.unshift(element);
    });
    setListOfFiles(tempfiles);
    setIsFilesPopulated(true);
  };

  if (!isFilesPopulated) {
    loadFiles();
  }

  const filterFilesByText = async (e, { value }) => {
    setIsLoading(true);

    const results = await listOfFiles.filter(file => {
      return (
        value.length > 0 &&
        file.name.toLowerCase().indexOf(value.toLowerCase().trim()) !== -1
      );
    });

    setTimeout(() => {
      setIsLoading(!results ? true : false);
    }, 300);

    if (results.length > 0) {
      setListOfFiles(results);
    } else {
      setIsFilesPopulated(false);
    }
  };

  const setPageChange = (e, { activePage }) => {
    setCurrentPage(activePage);
  };

  const performFilesPagination = () => {
    if (listOfFiles.length % itemsPerPage === 0) {
      totalPages = listOfFiles.length / itemsPerPage;
    } else {
      totalPages = parseInt(listOfFiles.length / itemsPerPage) + 1;
    }

    divisible = parseInt(listOfFiles.length / itemsPerPage);
    remainder = listOfFiles.length % itemsPerPage;

    startIndex = (currentPage - 1) * itemsPerPage;
    endIndex = divisible * itemsPerPage;
    endIndex = (currentPage - 1) * itemsPerPage + itemsPerPage;

    for (let i = startIndex; i < endIndex; i++) {
      allFileListInPagination.push(listOfFiles[i]);
    }
  };

  performFilesPagination();

  const handleCancel = () => {
    setConfirmDeletion({ enabled: false, fileID: null, fileName: null });
  };

  const deleteFile = () => {
    const id = confirmDeletion["fileID"];
    const fileName = confirmDeletion["fileName"];

    axios
      .delete(`http://localhost:5000/fileAws/${fileName}`)
      .then(res => {
        if (res.data.success) {
          const deleteFromDB = async () => {
            const res = await axios.delete(`http://localhost:5000/files/${id}`);
            if (res.data.ok) {
              console.log("file deleted");
              setIsFilesPopulated(false);
              setConfirmDeletion({
                enabled: false,
                fileID: null,
                fileName: null
              });
            }
          };

          deleteFromDB();
        }
      })
      .catch(error => {
        alert("DELETE ERROR: " + JSON.stringify(error));
      });
  };

  const openFile = url => {
    window.open(url, "_blank");
    // win.focus();
  };

  let deleteWarning =
    'Are you sure you want to delete "' + confirmDeletion["fileName"] + '"?';

  const fileLists = allFileListInPagination.map(file => {
    return (
      <Table.Body>
        <Table.Row
          as="tr"
          key={!file ? null : file._id}
          className={!file ? "invisible" : ""}
        >
          <Table.Cell singleLine>{!file ? "" : file.name}</Table.Cell>
          <Table.Cell singleLine>{!file ? "" : file.size}</Table.Cell>
          <Table.Cell singleLine>
            <Button
              onClick={() =>
                setConfirmDeletion({
                  enabled: true,
                  fileID: file._id,
                  fileName: file.name
                })
              }
              icon
              inverted
              color="red"
              labelPosition="left"
            >
              <Icon name="delete" /> Delete
            </Button>

            <TransitionablePortal
              onClose={handleCancel}
              open={confirmDeletion["enabled"]}
            >
              <Segment
                style={{
                  left: "30%",
                  position: "fixed",
                  top: "50%",
                  zIndex: 1000
                }}
              >
                <div style={{ width: 500 }}>
                  <div className="center">
                    <h3 align="center">Delete File</h3>
                  </div>

                  <div className="center">{deleteWarning}</div>

                  <div>
                    <Button color="green" floated="right" onClick={deleteFile}>
                      Yes
                    </Button>

                    <Button
                      color="black"
                      floated="right"
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </Segment>
            </TransitionablePortal>
            <Button
              onClick={() => openFile(file.url)}
              inverted
              color="violet"
              icon
              labelPosition="left"
            >
              <Icon name="eye" />
              View
            </Button>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    );
  });

  return (
    <div>
      <div>
        <Card unstackable fluid centered raised>
          <h1>Files</h1>
          <Table
            attached="bottom"
            size="small"
            unstackable="true"
            singleLine
            fixed
          >
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Size</Table.HeaderCell>
                <Table.HeaderCell>
                  <div className="actions">
                    <div className="autoMargin">
                      <Search
                        loading={isLoading}
                        input="text"
                        showNoResults={false}
                        actionPosition="left"
                        placeholder="Search..."
                        onSearchChange={filterFilesByText}
                      ></Search>
                    </div>
                    <div>
                      <Popup
                        content="Add supporting files"
                        trigger={
                          <Button
                            floated="right"
                            icon
                            inverted
                            labelPosition="left"
                            color="blue"
                            size="small"
                            onClick={() => setOpenModal(true)}
                          >
                            <Icon name="add" /> Add File
                          </Button>
                        }
                      />
                    </div>
                    <div>
                      <FileUploadComponent
                        setOpenModal={setOpenModal}
                        openModal={openModal}
                        setIsFilesPopulated={setIsFilesPopulated}
                      />
                    </div>
                  </div>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            {fileLists}
            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan="3">
                  <Menu floated="right" pagination>
                    <Pagination
                      pointing
                      secondary
                      activePage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setPageChange}
                    ></Pagination>
                  </Menu>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
        </Card>
      </div>
    </div>
  );
};

export default FileComponent;
