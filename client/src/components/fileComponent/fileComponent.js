import React, { useState, useEffect } from "react";
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
import "./fileComp.css";
import FileUpload from "./fileUpload";
import DeleteFile from "./delete";

const listOfStuffs = [
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
  const [filter, setFilter] = useState("");
  const [list, setList] = useState(listOfStuffs);
  const [page, setPage] = useState(1);
  const [fileID, setFileID] = useState("");
  const [openModal, setOpenModal] = useState(false);
  let itemsPerPage = 5,
    totalPages,
    divisible,
    remainder,
    startPoint, endPoint;

  useEffect(() => {
    let results = list.filter(items => {
      return (
        filter.length > 0 &&
        items.toLowerCase().indexOf(filter.toLowerCase().trim()) !== -1
      );
    });

    if (results.length > 0) {
      setList(results);
    } else {
      setList(listOfStuffs);
    }
  }, [filter]);

  if (list.length % itemsPerPage === 0) {
    totalPages = list.length / itemsPerPage;
  } else {
    totalPages = parseInt(list.length / itemsPerPage) + 1;
    
  }

  const setPageChange = (e, { activePage }) => {
    setPage(activePage);
  };

  divisible = parseInt(list.length / itemsPerPage);
  remainder = list.length % itemsPerPage;

  let allListinPagination = [];
  let realPage = page - 1;
  startPoint = realPage * itemsPerPage;
  endPoint = divisible * itemsPerPage;
  // console.log("endpoint before" + endPoint)
  if (endPoint === realPage * itemsPerPage) {
    endPoint += remainder;
  } else {
    endPoint = realPage * itemsPerPage + itemsPerPage;
  }
  //console.log("endpoint after" + endPoint)
  for (let i = startPoint; i < endPoint; i++) {
    allListinPagination.push(list[i]);
  }
  //console.log(all.length)

  const fileList = allListinPagination.map(list => {
    return (
      <Table.Body>
        <Table.Row>
          <Table.Cell>{list}</Table.Cell>
          <Table.Cell>{list}</Table.Cell>
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
                        onChange={e => setFilter(e.target.value)}
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
                      <FileUpload
                        setOpenModal={setOpenModal}
                        openModal={openModal}
                        setList={setList}
                        list={list}
                      />
                    </div>
                    <div>
                      <DeleteFile
                        fileID={fileID}
                        setList={setList}
                        list={list}
                      />
                    </div>
                  </div>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            {fileList}
            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan="3">
                  <Menu floated="right" pagination>
                    <Pagination
                      defaultActivePage={1}
                      pointing
                      secondary
                      activePage={page}
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
