import React, { useState } from "react";
import { Button, Form, Icon, Input, Modal, Tab, TabPane, Table, Card, Search, Menu, Pagination, Image } from "semantic-ui-react";
import { addClient, getAllOtherClients, addExistingClient } from "../../../api/AdminApi";

const AddClientForm = (props) => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [middleName, setMiddleName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [otherName, setOtherName] = useState(null);
  const [street, setStreet] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [zipCode, setZipCode] = useState(null);
  const [homePhone, setHomePhone] = useState(null);
  const [workPhone, setWorkPhone] = useState(null);
  const [cellPhone, setCellPhone] = useState(null);
  const [email, setEmail] = useState(null);
  const [open, setOpen] = useState(false);
  //pagination stuff
  const [listOfClients, setListOfClients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  /*
  const [openModal, setOpenModal] = useState(false);
  const [confirmDeletion, setConfirmDeletion] = useState({
    enabled: false,
    fileID: null,
    fileName: null
  });
  */

  //Pagination for existing clients
  let itemsPerPage = 5,
    totalPages,
    startIndex,
    endIndex,
    allClientListInPagination = [];

  const loadClients = async () => {
    const data = await getAllOtherClients();
    setListOfClients(data.data);
    props.setIsClientsPopulated(true);
  };

  if (!props.isClientsPopulated) {
    loadClients();
  }

  const filterClientsByText = (e, { value }) => {
    setIsLoading(true);
    setSearchValue(value);
    const results = listOfClients.filter(client => {
      const clientRealName = client.firstName + " " + client.secondName;
      return (
        value.length > 0 &&
        clientRealName.toLowerCase().indexOf(value.toLowerCase().trim()) !== -1
      );
    });

    setTimeout(() => {
      setIsLoading(!results ? true : false);
    }, 300);

    if (results.length > 0) {
      setListOfClients(results);
    } else {
      props.setIsClientsPopulated(false);
    }
  };

  const setPageChange = (e, { activePage }) => {
    setCurrentPage(activePage);
  };

  const performFilesPagination = () => {
    if (listOfClients.length % itemsPerPage === 0) {
      totalPages = listOfClients.length / itemsPerPage;
    } else {
      totalPages = parseInt(listOfClients.length / itemsPerPage) + 1;
    }
    startIndex = (currentPage - 1) * itemsPerPage;
    endIndex = (currentPage - 1) * itemsPerPage + itemsPerPage;

    for (let i = startIndex; i < endIndex; i++) {
      allClientListInPagination.push(listOfClients[i]);
    }
  };

  const handleCancel = () => {
    setOpen(false);
    setSearchValue("");
    props.setIsClientsPopulated(false);
  }

  performFilesPagination();

  const handleAddExistingClient = (id) => {
    addExistingClient(id);
    setSearchValue("");
    props.setIsClientsPopulated(false);
    props.setClients(false);
  }

  const addNewClientPagination =
    allClientListInPagination.map(client => {
      return (
        <Table.Body>
          <Table.Row
            as="tr"
            key={!client ? null : client._id}
            className={!client ? "invisible" : ""}
          >
            <Table.Cell singleLine>
              <Image avatar src={!client ? "" : client.imageUrl} />
              {!client ? "" : client.firstName + " " + client.secondName}
              <Button icon floated="right" onClick={() => handleAddExistingClient(client._id)}><Icon name="plus square outline" /></Button>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      );
    });

  const addNewClientComponent =
    <Modal.Content>
      <div>
        <div>
          <Card unstackable fluid centered raised>
            <Table
              attached="bottom"
              size="small"
              unstackable={true}
              singleLine
              fixed
            >
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Client</Table.HeaderCell>
                  <Table.HeaderCell>
                    <div className="actions">
                      <div className="autoMargin">
                        <Search
                          floated="right"
                          loading={isLoading}
                          input="text"
                          showNoResults={false}
                          actionPosition="left"
                          placeholder="Search..."
                          onSearchChange={filterClientsByText}
                          value={searchValue}
                        ></Search>
                      </div>
                    </div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              {addNewClientPagination}
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
          <Button onClick={handleCancel}>Cancel</Button>
        </div>
      </div>
    </Modal.Content>

  // Create new client
  const createNewClient = async () => {
    let addClientResponse = await addClient(
      username,
      password,
      firstName,
      lastName,
      middleName,
      otherName,
      street,
      city,
      state,
      zipCode,
      homePhone,
      workPhone,
      cellPhone,
      email,
      null
    );
    console.log(addClientResponse);
    if (addClientResponse.data) {
      alert("Successfully added new client!");
      props.addClientCallback(addClientResponse.data)
      setOpen(false);
    } else {
      alert("Failed to add client, please try again!");
      console.log("Unable to add client");
    }
  };

  const createNewClientComponent = <Modal.Content>
    <Form>
      <Form.Group widths="equal">
        <Form.Field
          control={Input}
          label="Username"
          placeholder="Username"
          onChange={event => setUsername(event.target.value)}
        />
        <Form.Field
          control={Input}
          label="Password"
          placeholder="Last name"
          onChange={event => setPassword(event.target.value)}
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Field
          control={Input}
          label="First name"
          placeholder="First name"
          onChange={event => setFirstName(event.target.value)}
        />
        <Form.Field
          control={Input}
          label="Middle name"
          placeholder="Middle name"
          onChange={event => setMiddleName(event.target.value)}
        />
        <Form.Field
          control={Input}
          label="Last name"
          placeholder="Last name"
          onChange={event => setLastName(event.target.value)}
        />
        <Form.Field
          control={Input}
          label="Preferred Name"
          placeholder="Preferred Name"
          onChange={event => setOtherName(event.target.value)}
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Field
          control={Input}
          label="Street"
          placeholder="Street"
          onChange={event => setStreet(event.target.value)}
        />
        <Form.Field
          control={Input}
          label="City"
          placeholder="City"
          onChange={event => setCity(event.target.value)}
        />
        <Form.Field
          control={Input}
          label="State"
          placeholder="State"
          onChange={event => setState(event.target.value)}
        />
        <Form.Field
          control={Input}
          label="Zip code"
          placeholder="Zip code"
          onChange={event => setZipCode(parseInt(event.target.value))}
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Field
          control={Input}
          label="Home phone"
          placeholder="Home phone"
          onChange={event => setHomePhone(parseInt(event.target.value))}
        />
        <Form.Field
          control={Input}
          label="Work phone"
          placeholder="Work phone"
          onChange={event => setWorkPhone(parseInt(event.target.value))}
        />
        <Form.Field
          control={Input}
          label="Cell phone"
          placeholder="Cell phone"
          onChange={event => setCellPhone(parseInt(event.target.value))}
        />
        <Form.Field
          control={Input}
          label="Email"
          placeholder="Email"
          onChange={event => setEmail(event.target.value)}
        />
      </Form.Group>
      <Button onClick={() => createNewClient()}>Add Client</Button>
      <Button onClick={handleCancel}>Cancel</Button>
    </Form>
  </Modal.Content>

  //Tab panes
  const panes = [
    {
      menuItem: 'Add an existing client', render: () => <Tab.Pane>{addNewClientComponent}</Tab.Pane>
    },
    { menuItem: 'Create a new client', render: () => <Tab.Pane>{createNewClientComponent}</Tab.Pane> }
  ]

  //Final Return
  return (
    <Modal
      trigger={
        <Button icon onClick={() => setOpen(true)}>
          <Icon name="plus square outline" />
        </Button>
      }
      open={open}
    >
      <Tab panes={panes} />
    </Modal>
  );
};

export default AddClientForm;