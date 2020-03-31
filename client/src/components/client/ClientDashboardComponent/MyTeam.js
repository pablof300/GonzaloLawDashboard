import React, { useState } from "react";
import {
  Card,
  Table,
  Pagination,
  Search,
  Icon,
  Menu,
  Popup,
  Button,
  Image
} from "semantic-ui-react";
import "../FileComponent/FileComponent.css";
import { getAllLawyersWorkingOnUserCase } from "../../../../src/api/UserApi";

const defaultProfile =
  "https://react.semantic-ui.com/images/wireframe/square-image.png";

const MyTeam = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [listOfLawyers, setListOfLawyers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [userLawyers, setUserLawyers] = useState(false);

  let itemsPerPage = 3,
    totalPages,
    startIndex,
    endIndex,
    allTeamListInPagination = [];

  const loadTeam = async () => {
    const userLawyers = await getAllLawyersWorkingOnUserCase();
    setListOfLawyers(userLawyers);
    setUserLawyers(true);
  };

  if (!userLawyers) {
    loadTeam();
  }

  const fullName = lawyer => {
    if (lawyer) {
      if (lawyer.middleName) {
        return (
          lawyer.firstName + " " + lawyer.middleName + " " + lawyer.secondName
        );
      }
      return lawyer.firstName + " " + lawyer.secondName;
    }
    return null;
  };

  const filterTeamByText = (e, { value }) => {
    setIsLoading(true);
    const results = listOfLawyers.filter(lawyer => {
      const name = fullName(lawyer);
      return (
        value.length > 0 &&
        name.toLowerCase().indexOf(value.toLowerCase().trim()) !== -1
      );
    });

    setTimeout(() => {
      setIsLoading(!results ? true : false);
    }, 300);

    if (results.length > 0) {
      setListOfLawyers(results);
    } else {
      setUserLawyers(false);
    }
  };

  const performTeamPagination = () => {
    if (listOfLawyers.length % itemsPerPage === 0) {
      totalPages = listOfLawyers.length / itemsPerPage;
    } else {
      totalPages = parseInt(listOfLawyers.length / itemsPerPage) + 1;
    }

    startIndex = (currentPage - 1) * itemsPerPage;
    endIndex = (currentPage - 1) * itemsPerPage + itemsPerPage;

    for (let i = startIndex; i < endIndex; i++) {
      allTeamListInPagination.push(listOfLawyers[i]);
    }
  };

  performTeamPagination();

  const setPageChange = (e, { activePage }) => {
    setCurrentPage(activePage);
  };

  const myLawyersList = allTeamListInPagination.map(lawyer => {
    return (
      <Table.Body>
        <Table.Row
          as="tr"
          key={!lawyer ? null : lawyer._id}
          className={!lawyer ? "invisible" : ""}
        >
          <Table.Cell singleLine>
            <Image
              src={
                !(lawyer && lawyer.imageUrl) ? defaultProfile : lawyer.imageUrl
              }
              size="tiny"
              rounded
              fluid
              style={{ width: 70, height: 70 }}
            ></Image>
          </Table.Cell>

          <Table.Cell singleLine>{!lawyer ? "" : fullName(lawyer)}</Table.Cell>
        </Table.Row>
      </Table.Body>
    );
  });

  return (
    <Table.HeaderCell>
      <Card unstackable={true} fluid centered>
        <div className="center">
          <h1>My Team</h1>
        </div>

        <Table
          attached="bottom"
          size="small"
          unstackable={true}
          singleLine
          fixed
          padded="very"
        >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Profile Picture</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>
                <Search
                  loading={isLoading}
                  input="text"
                  showNoResults={false}
                  placeholder="Search Lawyer..."
                  onSearchChange={filterTeamByText}
                ></Search>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          {myLawyersList}
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
                <div>
                  <Popup
                    content="Contact the team handling your case"
                    trigger={
                      <Button
                        floated="left"
                        icon
                        inverted
                        labelPosition="left"
                        color="green"
                        size="small"
                      >
                        <Icon name="chat" /> Contact My Team
                      </Button>
                    }
                  />
                </div>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </Card>
    </Table.HeaderCell>
  );
};

export default MyTeam;
