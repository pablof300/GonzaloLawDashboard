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

const myTeamsList = [
  {
    url: "https://react.semantic-ui.com/images/avatar/large/chris.jpg",
    name: "Tyler",
    id: 1
  },
  {
    url: "https://react.semantic-ui.com/images/avatar/large/ade.jpg",
    name: "Pablo",
    id: 2
  },
  {
    url: "https://react.semantic-ui.com/images/avatar/large/jenny.jpg",
    name: "Edward Mensah",
    id: 3
  },
  {
    url: "https://react.semantic-ui.com/images/avatar/large/justen.jpg",
    name: "Hutchinson Vandyke",
    id: 4
  },
  {
    url: "https://react.semantic-ui.com/images/avatar/large/nan.jpg",
    name: "Herman Perera",
    id: 5
  },
  {
    url: "https://react.semantic-ui.com/images/avatar/large/stevie.jpg",
    name: "Nate Stull",
    id: 6
  },
  {
    url: "https://react.semantic-ui.com/images/wireframe/square-image.png",
    name: "Patrick White",
    id: 7
  }
];

const defaultProfile =
  "https://react.semantic-ui.com/images/wireframe/square-image.png";

const MyTeam = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [listOfLawyers, setListOfLawyers] = useState(myTeamsList);
  const [currentPage, setCurrentPage] = useState(1);
  const [isTeamPopulated, setIsTeamPopulated] = useState(false);

  let itemsPerPage = 3;
  let totalPages;
  let startIndex;
  let endIndex;
  let allTeamListInPagination = [];

  const loadTeam = () => {
    /*let tempData = [];
  myTeamsList.forEach(element => {
    tempData.unshift(element);
  });*/
    /*setListOfLawyers(myTeamsList);
  setIsTeamPopulated(true);*/
  };

  /*if (!isTeamPopulated) {
  loadTeam();
}
*/

  const filterTeamByText = (e, { value }) => {
    setIsLoading(true);

    const results = listOfLawyers.filter(lawyer => {
      return (
        value.length > 0 &&
        lawyer.name.toLowerCase().indexOf(value.toLowerCase().trim()) !== -1
      );
    });

    setTimeout(() => {
      setIsLoading(!results ? true : false);
    }, 300);

    if (results.length > 0) {
      setListOfLawyers(results);
    } else {
      setListOfLawyers(myTeamsList);
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
          key={!lawyer ? null : lawyer.id}
          className={!lawyer ? "invisible" : ""}
        >
          <Table.Cell singleLine>
            <Image
              src={!lawyer ? defaultProfile : lawyer.url}
              size="tiny"
              rounded
              fluid
              style={{ width: 70, height: 70 }}
              ui={true}
              wrapped={true}
            ></Image>
          </Table.Cell>

          <Table.Cell singleLine>{!lawyer ? "" : lawyer.name}</Table.Cell>
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
