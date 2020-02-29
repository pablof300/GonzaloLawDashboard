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
  Reveal
} from "semantic-ui-react";
import "./fileComponent.css";
import FileUploadComponent from "./fileUploadComponent";
import DeleteFileComponent from "./deleteFileComponent";

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

const FileComponent = () => {
  const [listOfFiles, setListOfFiles] = useState(testFileNamesData);
  const [currentPage, setCurrentPage] = useState(1);
  const [fileID, setFileID] = useState(""); //need the id to locate on database to pass as prop
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  let itemsPerPage = 5,
    totalPages,
    divisible,
    remainder,
    startIndex,
    endIndex,
    allFileListInPagination = [];

  const filterFilesByText = (e, { value }) => {
    if (value.length > 0) {
      setIsLoading(true);
    }

    let results = listOfFiles.filter(fileName => {
      return (
        e.target.value.length > 0 &&
        fileName.toLowerCase().indexOf(e.target.value.toLowerCase().trim()) !==
          -1
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

    /*if (endIndex === (currentPage - 1) * itemsPerPage) {
      endIndex += remainder;
    } else {
      endIndex = (currentPage - 1) * itemsPerPage + itemsPerPage;
    }*/
    endIndex = (currentPage - 1) * itemsPerPage + itemsPerPage;

    for (let i = startIndex; i < endIndex; i++) {
      allFileListInPagination.push(listOfFiles[i]);
    }
  };

  performFilesPagination();

  const fileLists = allFileListInPagination.map(file => {
    return (
      <Table.Body>
        <Table.Row className={!file ? 'invisible':''}>
          <Table.Cell singleLine>{file}</Table.Cell>
          <Table.Cell singleLine>20mb</Table.Cell>
          <Table.Cell singleLine>
            <Button icon inverted color="red" labelPosition="left">
              <Icon name="delete" /> Delete
            </Button>
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
                    <div>
                      <DeleteFileComponent
                        fileID={fileID}
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
