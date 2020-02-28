import React, { useState } from "react";
import {
  Button,
  Table,
  Input,
  Icon,
  Menu,
  Pagination,
  Popup,
  Grid
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
  let itemsPerPage = 5,
    totalPages,
    divisible,
    remainder,
    startIndex,
    endIndex,
    allFileListInPagination = [];

  const filterFilesByText = e => {
    let results = listOfFiles.filter(fileName => {
      return (
        e.target.value.length > 0 &&
        fileName.toLowerCase().indexOf(e.target.value.toLowerCase().trim()) !==
          -1
      );
    });

    if (results.length > 0) {
      setListOfFiles(results);
    } else {
      setListOfFiles(testFileNamesData);
    }
  };

  const setPageChange = (e, { activePage }) => {
    setCurrentPage(activePage);
  };

  const FilesPagination = () => {
    if (listOfFiles.length % itemsPerPage === 0) {
      totalPages = listOfFiles.length / itemsPerPage;
    } else {
      totalPages = parseInt(listOfFiles.length / itemsPerPage) + 1;
    }

    divisible = parseInt(listOfFiles.length / itemsPerPage);
    remainder = listOfFiles.length % itemsPerPage;

    startIndex = (currentPage - 1) * itemsPerPage;
    endIndex = divisible * itemsPerPage;

    if (endIndex === (currentPage - 1) * itemsPerPage) {
      endIndex += remainder;
    } else {
      endIndex = (currentPage - 1) * itemsPerPage + itemsPerPage;
    }

    for (let i = startIndex; i < endIndex; i++) {
      allFileListInPagination.push(listOfFiles[i]);
    }
  };

  FilesPagination();

  const fileLists = allFileListInPagination.map(file => {
    return (
      <Table.Body>
        <Table.Row>
          <Table.Cell>{file}</Table.Cell>
          <Table.Cell>20mb</Table.Cell>
          <Table.Cell>
            <Button icon labelPosition="left" primary>
              {" "}
              <Icon name="delete" /> Delete
            </Button>
            <Button primary icon labelPosition="left" primary>
              {" "}
              <Icon name="eye" />
              View
            </Button>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    );
  });
  const styles = {
    marginLeft: 40,
    marginRight: 40
  };
  return (
    <div>
      <Grid container stackable verticalAlign="bottom">
        <Grid.Column verticalAlign="bottom" width={20}>
          <Table fixed>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Size</Table.HeaderCell>
                <Table.HeaderCell>
                  <div className="actions">
                    <div className="autoMargin">
                      <Input
                        type="text"
                        icon="search"
                        actionPosition="left"
                        placeholder="Search..."
                        onChange={filterFilesByText}
                      ></Input>
                    </div>
                    <div>
                      <Popup
                        content="Add supporting files"
                        trigger={
                          <Button
                            floated="right"
                            icon
                            labelPosition="left"
                            primary
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
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default FileComponent;
