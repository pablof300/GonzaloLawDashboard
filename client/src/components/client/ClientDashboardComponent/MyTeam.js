import React, { useState, useEffect } from "react";
import {
  Card,
  Table,
  Pagination,
  Search,
  Icon,
  Menu,
  Popup,
  Button,
  Image,
  Modal,
  Form,
  Checkbox,
  Dropdown,
  TextArea,
  Transition,
  TransitionablePortal,
  Dimmer,
  Segment,
  List,
  Label,
} from "semantic-ui-react";
import "../FileComponent/FileComponent.css";
import {
  getAllLawyersWorkingOnUserCase,
  getCurrentUser,
  sendMessageToTeam,
} from "../../../../src/api/UserApi";
import Snackbar from "../../../Snackbar";
import "../../../Snackbar.css";

const defaultProfile =
  "https://react.semantic-ui.com/images/wireframe/square-image.png";

const MyTeam = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [listOfLawyers, setListOfLawyers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [userLawyers, setUserLawyers] = useState(false);
  const [openEmailBox, setOpenEmailBox] = useState(false);
  const [emailThisTeam, setEmailThisTeam] = useState([]);
  const [contactTeam, setContactTeam] = useState(false);
  const [disableDone, setDisableDone] = useState(true);
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [snackbar, setSnackBar] = useState({
    enable: false,
    message: "Success",
    type: "success",
    color: "green",
  });

  let itemsPerPage = 3,
    totalPages,
    startIndex,
    endIndex,
    allTeamListInPagination = [];

  const loadTeam = async () => {
    const userLawyers = (await getAllLawyersWorkingOnUserCase()).data;
    if (userLawyers) {
      setListOfLawyers(userLawyers);
      setUserLawyers(true);

      props.setIsLoading(false);
    }
  };

  if (!userLawyers) {
    props.setIsLoading(true);
    loadTeam();
  }

  const fullName = (lawyer) => {
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
    const results = listOfLawyers.filter((lawyer) => {
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

  const sendMessage = async () => {
    const user = (await getCurrentUser()).data;
    if (user) {
      if (message && subject) {
        let to = "";
        const from = user.secondName + " <" + user.contact.email + "> ";
        let c = 0;
        emailThisTeam.map((lawyer) => {
          if (c === 0) {
            to = lawyer.email;
          } else {
            to = to.concat(", ").concat(lawyer.email);
          }
          c++;
        });
        const mailOptions = {
          from: from,
          to: to,
          subject: subject,
          text: message,
        };
        const res = await sendMessageToTeam(mailOptions);
        if (res) {
          handleMessageCancel();
          setEmailThisTeam([]);
          setDisableDone(true);
          setContactTeam(false);
          setSnackBar({
            enable: true,
            message: "Message sent successfully. Please wait...",
            type: "checkmark",
            color: "green",
          });
          setTimeout(() => {
            RefreshPage();
          }, 1900);
        }
      }
    } else {
      setSnackBar({
        enable: true,
        message: "User logged out or user session has expired",
        type: "warning",
        color: "red",
      });
    }
  };

  const RefreshPage = () => {
    window.location.reload(false);
  };

  const handleMessageCancel = () => {
    setOpenEmailBox(false);
    setMessage("");
    setSubject("");
    //setUserLawyers(false);
  };

  const addLawyer = (lawyer) => {
    if (lawyer) {
      const name = fullName(lawyer);
      const mLawyer = {
        key: lawyer._id,
        value: name,
        text: name,
        email: !(lawyer.contact && lawyer.contact.email)
          ? "angelgab2222@gmail.com"
          : lawyer.contact.email,
        image: {
          avatar: true,
          scr: lawyer.imageUrl,
        },
      };
      emailThisTeam.push(mLawyer);
    }
  };

  const removeLawyer = (lawyer) => {
    let tempTeam = [];
    emailThisTeam.forEach((element) => {
      if (element.key !== lawyer._id) {
        tempTeam.push(element);
      }
    });
    setEmailThisTeam(tempTeam);
  };

  const getLawyer = (data, lawyer) => {
    if (data.checked) {
      addLawyer(lawyer);
    } else {
      removeLawyer(lawyer);
    }
    if (emailThisTeam.length > 0) {
      setDisableDone(false);
    } else {
      setDisableDone(true);
    }
  };

  useEffect(() => {
    if (emailThisTeam.length > 0) {
      setDisableDone(false);
    } else {
      setDisableDone(true);
    }
  }, [emailThisTeam.length]);

  const userContactTeam = () => {
    setContactTeam(true);
  };

  const doneSelecting = () => {
    if (emailThisTeam.length > 0) {
      setOpenEmailBox(true);
    }
  };

  const performTeamPagination = () => {
    if (listOfLawyers) {
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
    }
  };

  performTeamPagination();

  const setPageChange = (e, { activePage }) => {
    setCurrentPage(activePage);
  };

  const myLawyersList = allTeamListInPagination.map((lawyer) => {
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

          <Table.Cell singleLine>
            {lawyer && (
              <Checkbox
                className={!contactTeam ? "invisible" : ""}
                onChange={(e, data) => getLawyer(data, lawyer)}
              />
            )}
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    );
  });

  return (
    <div>
      <Table.HeaderCell>
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
                  disabled={contactTeam}
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
                        className={listOfLawyers.length > 0 ? "contactLawyersButton" : "invisible"}
                        floated="left"
                        icon
                        inverted
                        labelPosition="left"
                        color="green"
                        size="small"
                        onClick={userContactTeam}
                      >
                        <Icon name="chat" /> Contact My Team
                      </Button>
                  }
                />

                <Button
                  className={!contactTeam ? "invisible" : ""}
                  floated="left"
                  icon
                  disabled={disableDone}
                  inverted
                  labelPosition="left"
                  color="purple"
                  size="small"
                  onClick={doneSelecting}
                >
                  <Icon name="check" /> Done
                  </Button>
                </div>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
        <div></div>
      </Table.HeaderCell>

      <div className="center2">
        <Transition visible={openEmailBox} animation="fade" duration={200}>
          <Dimmer.Inner active={openEmailBox} page />
        </Transition>
        <TransitionablePortal
          closeOnDocumentClick={false}
          transition={{ animation: "scale", duration: 200 }}
          open={openEmailBox}
          size="small"
        >
          <Segment
            className="center2"
            style={{
              left: "25%",
              position: "fixed",
              top: "20%",
              zIndex: 1000,
            }}
          >
            <Modal.Header>Send a message to your Team</Modal.Header>
            <Form widths="equal">
              <Dropdown
                selection={false}
                style={{ marginBottom: 10 }}
                placeholder="To"
                selection
                options={emailThisTeam}
              />
              <Form.Input
                className="wrap"
                label="Subject"
                type="text"
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Subject"
                labelPosition="left"
                value={subject}
              />
              <TextArea
                className="wrap"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{ minHeight: 200, marginBottom: 20 }}
                placeholder="Type message here..."
              />
              <Button className="sendMessageButton" onClick={sendMessage} content="Send Message" primary />
              <Button className="cancelMessageButton" onClick={handleMessageCancel} content="Cancel" primary />
            </Form>
          </Segment>
        </TransitionablePortal>
      </div>

      <Snackbar snackbar={snackbar} setSnackBar={setSnackBar} />
    </div>
  );
};

export default MyTeam;
