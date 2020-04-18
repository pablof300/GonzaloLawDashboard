import React, { useState } from "react";
import {
  Table,
  Pagination,
  Button,
  Search,
  Menu,
  Icon,
} from "semantic-ui-react";
import { getClientFilesById } from "../../../../api/AdminApi";

function ClientFiles(props) {
  const [listOfFiles, setListOfFiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilesPopulated, setIsFilesPopulated] = useState(false);
  let itemsPerPage = 5,
    totalPages,
    startIndex,
    endIndex,
    allFileListInPagination = [];

  const loadFiles = async () => {
    const data = (await getClientFilesById(props.clientData._id)).data;
    if (data) {
      setListOfFiles(data.reverse());
    }
    setIsFilesPopulated(true);
    props.setIsLoading(false)
  };

  if (!isFilesPopulated) {
      props.setIsLoading(true)
    loadFiles();
  }

  const filterFilesByText = (e, { value }) => {
    let results = listOfFiles.filter((file) => {
      return (
        value.length > 0 &&
        file.name.toLowerCase().indexOf(value.toLowerCase().trim()) !== -1
      );
    });

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
    }
  };

  performFilesPagination();

  function downloadFile(url, name) {
    const link = document.createElement('a');
    link.download = name + ".pdf";
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

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
              onClick={() => downloadFile(file.url, file.name)}
              inverted
              color="violet"
              icon
              labelPosition="left"
            >
              <Icon name="download" />
              Download
            </Button>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    );
  });

  return (
    <div style={{ alignContent: "center", justifyContent: "center" }}>
      <Table attached="top" size="small" basic unstackable singleLine fixed>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Size</Table.HeaderCell>
            <Table.HeaderCell>
            <Search
                  size="mini"
                  input="text"
                  showNoResults={false}
                  placeholder="Search..."
                  onSearchChange={filterFilesByText}
                ></Search>
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
    </div>
  );
}

export default ClientFiles;
