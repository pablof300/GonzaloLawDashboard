import React, { useState } from "react";
import {
  Tab,
  Container,
  Card,
  Grid,
  Table,
  Pagination,
  Search,
  Icon,
  Menu,
  Popup,
  Button,
  Image,
  Form
} from "semantic-ui-react";
import "../FileComponent/FileComponent.css";

const MyAccount = () => {
  const myInfo = {
    firstName: "Edward",
    secondName: "Mensah",
    middleName: "D.",
    birthDate: "09/20/1994",
    phoneNumber: "123-456-789",
    email: "edward@gmail",
    bio: "I am looking forward for my case to be resolved :)"
  };
  return (
    <div>
      <Card unstackable fluid centered>
        <Grid divided="vertically" style={{ margin: 30 }}>
          <Grid.Row>
            <h3>Personal Information</h3>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={4}>
              <Popup
                content="Click to Change Profile Picture"
                trigger={
                  <Image
                    src="https://react.semantic-ui.com/images/wireframe/image.png"
                    size="huge"
                    rounded
                    fluid
                  ></Image>
                }
              />
            </Grid.Column>

            <Grid.Column>
              <Grid.Row textAlign="left">
                <Form widths="equal">
                  <Form.Group className="wrap" unstackable>
                    <Form.Input
                      label="First name"
                      placeholder="First name"
                      labelPosition="left"
                      readOnly
                      value={myInfo.firstName}
                    />
                    <Form.Input
                      label="Last name"
                      placeholder="Last name"
                      labelPosition="left"
                      readOnly
                      value={myInfo.secondName}
                    />
                  </Form.Group>
                  <Form.Input
                    className="wrap"
                    label="Middle name"
                    labelPosition="left"
                    placeholder="Middle name"
                    readOnly
                    value={myInfo.middleName}
                  />
                  <Form.Input
                    className="wrap"
                    label="Birth Date"
                    labelPosition="left"
                    placeholder="mm/dd/yy"
                    readOnly
                    value={myInfo.birthDate}
                  />
                  <Form.Input
                    className="wrap"
                    label="Biography"
                    labelPosition="left"
                    placeholder="Biography"
                    readOnly
                    value={myInfo.bio}
                  />
                  <Form.Input
                    className="wrap"
                    label="Phone Number"
                    labelPosition="left"
                    placeholder="Phone Number"
                    readOnly
                    value={myInfo.phoneNumber}
                  />
                </Form>
              </Grid.Row>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <h3>Email</h3>
          </Grid.Row>
          <Grid.Row textAlign="left">
            <Form widths="equal">
              <Form.Input
                className="wrap"
                label="Email"
                labelPosition="left"
                placeholder="Email"
                readOnly
                value={myInfo.email}
              />
            </Form>
          </Grid.Row>
        </Grid>
      </Card>
    </div>
  );
};

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
  },
];

const defaultProfile = "https://react.semantic-ui.com/images/wireframe/square-image.png";

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
    
  }
  loadTeam();*/

  const filterTeamByText = async (e, { value }) => {
    setIsLoading(true);

    const results = await listOfLawyers.filter(lawyer => {
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
            ></Image>
          </Table.Cell>

          <Table.Cell singleLine>{!lawyer ? "" : lawyer.name}</Table.Cell>
        </Table.Row>
      </Table.Body>
    );
  });

  return (
    <div>
      <Card unstackable fluid centered>
        <div className="center">
          <h1>My Team</h1>
        </div>

        <Table
          attached="bottom"
          size="small"
          unstackable="true"
          singleLine
          fixed
        >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Profile Picture</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>
                <div className="actions">
                  <div className="autoMargin">
                    <Search
                      loading={isLoading}
                      input="text"
                      showNoResults={false}
                      actionPosition="left"
                      placeholder="Search Lawyer..."
                      onSearchChange={filterTeamByText}
                    ></Search>
                  </div>
                </div>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          {myLawyersList}
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="2">
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
              <div className="center">
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
            </Table.Row>
          </Table.Footer>
        </Table>
      </Card>
    </div>
  );
};

const panes = [
  { menuItem: "My Account", render: () => <MyAccount /> },
  { menuItem: "My Team", render: () => <MyTeam /> }
];

const UserDetailsComponent = () => {
  return (
    <Container>
      <Tab
        menu={{ fluid: true, vertical: true, tabular: true }}
        panes={panes}
      />
    </Container>
  );
};

export default UserDetailsComponent;
