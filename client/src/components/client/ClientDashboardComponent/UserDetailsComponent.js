import React, { useState, useRef } from "react";
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
  Form,
  Input
} from "semantic-ui-react";
import "../FileComponent/FileComponent.css";
import { getCurrentUser, updateUserData } from "../../../../src/api/UserApi";

const MyAccount = () => {
  const [userData, setUserData] = useState([]);
  const [hasUser, setHasUser] = useState(false);
  const [userID, setUserID] = useState();
  const [hasUpdate, setHasUpadate] = useState(false);
  const [mRef, setRef] = useState(null);
  //let inputFile = useRef(null);

  const loadUserData = async () => {
    const user = (await getCurrentUser()).data;
    setUserID(user._id);
    setUserData(user);
    setHasUser(true);
    //console.log(mRef)
  };
  if (!hasUser) {
    loadUserData();
  }

  const updateUser = async () => {
    const myInfo = {
      firstName: "Pablo",
      secondName: "Estrada",
      middleName: "G.",
      address: {
        street: "5654 129th Ave N",
        city: "Miami",
        state: "Florida",
        zip: 44782
      },
      contact: {
        cellPhone: 123456789,
        email: "edward@gmail.com"
      },
      birthDate: "09/20/1994"
    };

    const data = (await updateUserData(myInfo)).data;
    // console.log(data);
    setHasUpadate(true);
  };

  const getFile = e => {
    console.log(e);
  };

  if (!hasUpdate) {
    //updateUser();
  }

  return (
    <div>
      <Card unstackable fluid centered>
        <Grid
          unstackable
          padded="vertically"
          divided="vertically"
          style={{ margin: 30 }}
        >
          <Grid.Row>
            <h3>Personal Information</h3>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={3}>
              <Popup
                content="Click to Change Profile Picture"
                trigger={
                  <Image
                    src="https://react.semantic-ui.com/images/wireframe/image.png"
                    size="huge"
                    rounded
                    fluid
                    onClick={() => mRef.current.onClick()}
                  />
                }
              />
              <Input
                className="invisible"
                type="file"
                id="fileUpload"
                onChange={getFile.bind(this)}
                ref={r => setRef(r)}
              />
            </Grid.Column>

            <Grid.Column stretched={true}>
              <Grid.Row stretched={true} textAlign="left">
                <Form widths="equal">
                  <Form.Group className="wrap" unstackable>
                    <Form.Input
                      label="First name"
                      placeholder="First name"
                      labelPosition="left"
                      readOnly
                      value={!userData ? "" : userData.firstName}
                    />
                    <Form.Input
                      label="Last name"
                      placeholder="Last name"
                      labelPosition="left"
                      readOnly
                      value={!userData ? "" : userData.secondName}
                    />
                  </Form.Group>

                  <Form.Group className="wrap" unstackable>
                    <Form.Input
                      className={!userData.middleName ? "hidden" : ""}
                      label="Middle name"
                      labelPosition="left"
                      placeholder="Middle name"
                      readOnly
                      value={!userData ? "" : userData.middleName}
                    />
                    <Form.Input
                      className={!userData.otherName ? "hidden" : ""}
                      label="Other name"
                      placeholder="Other name"
                      labelPosition="left"
                      readOnly
                      value={!userData ? "" : userData.otherName}
                    />
                  </Form.Group>

                  <Form.Input
                    className="wrap"
                    label="Birth Date"
                    labelPosition="left"
                    placeholder="mm/dd/yy"
                    readOnly
                    value={!userData ? "" : userData.birthDate}
                  />
                  <Form.Input
                    className="wrap"
                    label="Username"
                    labelPosition="left"
                    placeholder="Username"
                    readOnly
                    value={!userData ? "" : userData.username}
                  />

                  <Form.Input
                    className="wrap"
                    label="Phone Number"
                    labelPosition="left"
                    placeholder="Phone Number"
                    readOnly
                    value={
                      !userData.contact ? null : userData.contact.cellPhone
                    }
                  />

                  <Form.Group className="wrap" unstackable>
                    <Form.Input
                      className={!userData.workPhone ? "hidden" : ""}
                      label="Work Phone"
                      labelPosition="left"
                      placeholder="Work Phone"
                      readOnly
                      value={!userData ? "" : userData.workPhone}
                    />
                    <Form.Input
                      className={!userData.homePhone ? "hidden" : ""}
                      label="Home Phone"
                      placeholder="Home Phone"
                      labelPosition="left"
                      readOnly
                      value={!userData ? "" : userData.homePhone}
                    />
                  </Form.Group>
                </Form>
              </Grid.Row>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <h3>Address</h3>
          </Grid.Row>

          <Grid.Row stretched={true} textAlign="left">
            <Form widths="equal">
              <Form.Group className="wrap" unstackable>
                <Form.Input
                  label="Street"
                  placeholder="Street"
                  labelPosition="left"
                  readOnly
                  value={!userData.address ? "" : userData.address.street}
                />
                <Form.Input
                  label="City"
                  placeholder="City"
                  labelPosition="left"
                  readOnly
                  value={!userData.address ? "" : userData.address.city}
                />
              </Form.Group>
              <Form.Group className="wrap" unstackable>
                <Form.Input
                  label="State"
                  placeholder="State"
                  labelPosition="left"
                  readOnly
                  value={!userData.address ? "" : userData.address.state}
                />
                <Form.Input
                  label="Zip"
                  placeholder="Zip"
                  labelPosition="left"
                  readOnly
                  value={!userData.address ? "" : userData.address.zip}
                />
              </Form.Group>
            </Form>
          </Grid.Row>

          <Grid.Row>
            <h3>Email</h3>
          </Grid.Row>
          <Grid.Row stretched={true} textAlign="left">
            <Form widths="equal">
              <Form.Input
                className="wrap"
                label="Email"
                labelPosition="left"
                placeholder="Email"
                readOnly
                value={!userData.contact ? "" : userData.contact.email}
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
              style={{width:70, height:70}}
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
    <div>
      <Card unstackable fluid centered>
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
      renderActiveOnly={true}
        menu={{ fluid: true, vertical: true, tabular: true }}
        panes={panes}
      />
    </Container>
  );
};

export default UserDetailsComponent;
