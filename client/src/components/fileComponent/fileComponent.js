import React, { useState } from "react";
import {
  Button,
  Table,
  Input,
  Icon,
  Menu,
  Pagination,
  Popup,
  Grid,
  Card,
  Search,
  Reveal,
  Confirm
} from "semantic-ui-react";
import "./fileComponent.css";
import FileUploadComponent from "./fileUploadComponent";

const testFileNamesData = [
  "colors",
  "phones",
  "orange",
  "banana",
  "apple",
  "hover",
  "yeah",
  "here",
  "hover",
  "yeah",
  "mango",
  "pear",
  "fruits",
  "orange123",
  "headphones",
  "book",
  "paper",
  "pen",
  "tvs",
  "charges",
  "umbrella",
  "water"
];

// TODO:
// - Refactor confirmDeletion to be by fileId not testFileNamesData

const FileComponent = () => {
  const [listOfFiles, setListOfFiles] = useState(testFileNamesData);
  const [currentPage, setCurrentPage] = useState(1);
  const [fileID, setFileID] = useState(""); //need the id to locate on database to pass as prop
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmDeletion, setConfirmDeletion] = useState({
    enabled: false,
    fileName: null
  });

  let itemsPerPage = 5;
  let totalPages;
  let divisible;
  let remainder;
  let startIndex;
  let endIndex;
  let allFileListInPagination = [];

  const filterFilesByText = (e, { value }) => {
    setIsLoading(true);

    let results = listOfFiles.filter(fileName => {
      return (
        value.length > 0 &&
        fileName.toLowerCase().indexOf(value.toLowerCase().trim()) !== -1
      );
    });

    setTimeout(() => {
      setIsLoading(!results ? true : false);
    }, 900);
    if (results.length > 0) {
      setListOfFiles(results);
    } else {
      setListOfFiles(testFileNamesData);
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
    setConfirmDeletion({ enabled: false, fileName: null });
  };

  const deleteFile = () => {
    let files = [];
    let file = confirmDeletion["fileName"];
    listOfFiles.forEach(element => {
      if (element !== file) {
        files.push(element);
      }
    });
    setListOfFiles(files);
    setConfirmDeletion({ enabled: false, fileName: null });
  };

  let deleteWarning =
    'Are you sure you want to delete "' + confirmDeletion["fileName"] + '"?';

  const fileLists = allFileListInPagination.map(file => {
    return (
      <Table.Body>
        <Table.Row className={!file ? "invisible" : ""}>
          <Table.Cell singleLine>{file}</Table.Cell>
          <Table.Cell singleLine>20mb</Table.Cell>
          <Table.Cell singleLine>
            <Button
              onClick={() =>
                setConfirmDeletion({ enabled: true, fileName: file })
              }
              icon
              inverted
              color="red"
              labelPosition="left"
            >
              <Icon name="delete" /> Delete
            </Button>
            <Confirm
              open={confirmDeletion["enabled"]}
              header="Delete File"
              content={deleteWarning}
              confirmButton="Yes"
              onCancel={handleCancel}
              onConfirm={deleteFile}
            />
            <Button inverted color="violet" icon labelPosition="left">
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
      <div className="keepbottom container">
        <Card unstackable fluid centered raised>
          <div className="center">
            <h2 align="center">Files Upload</h2>
          </div>
          <Table attached="bottom" size="small" unstackable singleLine fixed>
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
                        setListOfFiles={setListOfFiles}
                        listOfFiles={listOfFiles}
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
                      defaultActivePage={1}
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
