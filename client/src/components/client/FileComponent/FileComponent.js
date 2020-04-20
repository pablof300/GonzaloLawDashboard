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
} from "semantic-ui-react";
import "./FileComponent.css";
import FileUploadComponent from "./FileUploadComponent";
import {
  getAllUserFiles,
  deleteUserFileById,
} from "../../../../src/api/UserApi";
import Snackbar from "../../../Snackbar";

const FileComponent = () => {
  const [listOfFiles, setListOfFiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmDeletion, setConfirmDeletion] = useState({
    enabled: false,
    fileID: null,
    fileName: null,
  });
  const [snackbar, setSnackBar] = useState({
    enable: false,
    message: "Success",
    type: "checkmark",
    color: "green",
  });
  const [isFilesPopulated, setIsFilesPopulated] = useState(false);
  const [deletedFile, setDeletedFile] = useState(false);

  let itemsPerPage = 5,
    totalPages,
    startIndex,
    endIndex,
    allFileListInPagination = [];

  const loadFiles = async () => {
    const data = (await getAllUserFiles()).data;
    if (data) {
      setListOfFiles(data.reverse());
      setIsFilesPopulated(true);
    }
  };

  if (!isFilesPopulated) {
    loadFiles();
  }

  const filterFilesByText = (e, { value }) => {
    setIsLoading(true);

    const results = listOfFiles.filter((file) => {
      return (
        value.length > 0 &&
        file.name.toLowerCase().indexOf(value.toLowerCase().trim()) !== -1
      );
    });

    setTimeout(() => {
      setIsLoading(!results ? true : false);
    }, 300);

    if (results && results.length > 0) {
      setListOfFiles(results);
    } else {
      setIsFilesPopulated(false);
    }
  };

  const setPageChange = (e, { activePage }) => {
    setCurrentPage(activePage);
  };

  const performFilesPagination = () => {
    if (listOfFiles) {
      if (listOfFiles.length % itemsPerPage === 0) {
        totalPages = listOfFiles.length / itemsPerPage;
      } else {
        totalPages = parseInt(listOfFiles.length / itemsPerPage) + 1;
      }
      startIndex = (currentPage - 1) * itemsPerPage;
      endIndex = (currentPage - 1) * itemsPerPage + itemsPerPage;

      for (let i = startIndex; i < endIndex; i++) {
        allFileListInPagination.push(listOfFiles[i]);
      }
      if (deletedFile && !allFileListInPagination[0]) {
        setCurrentPage(currentPage - 1);
        setDeletedFile(false);
      }
    }
  };

  performFilesPagination();

  const handleCancel = () => {
    setConfirmDeletion({ enabled: false, fileID: null, fileName: null });
  };

  const deleteFile = async () => {
    const params = {
      id: confirmDeletion["fileID"],
      fileName: confirmDeletion["fileName"],
      folder: "caseFiles",
    };

    const fileIsDeleted = await deleteUserFileById(params);
    if (fileIsDeleted) {
      setIsFilesPopulated(false);
      setDeletedFile(true);
      setConfirmDeletion({
        enabled: false,
        fileID: null,
        fileName: null,
      });
      setSnackBar({
        enable: true,
        message: "File deleted successfully",
        type: "checkmark",
        color: "green",
      });
    }else{
      setSnackBar({
        enable: true,
        message: "An unknown error has occurred",
        type: "warning",
        color: "red",
      });
    }
  };

  const openFile = (url) => {
    window.open(url, "_blank");
    // win.focus();
  };

  let deleteWarning =
    'Are you sure you want to delete "' + confirmDeletion["fileName"] + '"?';

  const fileLists = allFileListInPagination.map((file) => {
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
                  fileName: file.name,
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
                className="center"
                raised
                style={{
                  left: "25%",
                  position: "fixed",
                  top: "50%",
                  zIndex: 1000,
                }}
              >
                <div>
                  <div className="center">
                    <h3 align="center">Delete File</h3>
                  </div>

                  <div>{deleteWarning}</div>

                  <div style={{ marginTop: 18 }}>
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
            unstackable={true}
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
                        position="top right"
                        positionFixed
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
        <Snackbar snackbar={snackbar} setSnackBar={setSnackBar} />
      </div>
    </div>
  );
};

export default FileComponent;
