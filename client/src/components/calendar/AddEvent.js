import React, { useState, useEffect } from "react";
import {
  Input,
  Button,
  Modal,
  Dropdown,
  Header,
  Form
} from "semantic-ui-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getAllClients, addEvent } from "../../api/AdminApi";

import "./Calendar.css"

const AddEvent = props => {
  const [userData, setUserData] = useState([]);

  const [startDate, setStartDate] = useState(null);
  const [personId, setPersonId] = useState(null);
  const [duration, setDuration] = useState(null);
  const [notes, setNotes] = useState(null);
  const [type, setType] = useState(null);
  const [title, setTitle] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setData();
  }, []);

  const durationOptions = [
    {
      key: "15",
      text: "15 minutes",
      value: 15
    },
    {
      key: "30",
      text: "30 minutes",
      value: 30
    },
    {
      key: "60",
      text: "60 minutes",
      value: 60
    },
    {
      key: "120",
      text: "2 hours",
      value: 120
    },
    {
      key: "180",
      text: "3 hours",
      value: 180
    }
  ];

  const submitEvent = async () => {
    let addEventResponse = await addEvent(
      title,
      type,
      startDate,
      duration,
      notes,
      personId
    );
    console.log(addEventResponse);
    if (addEventResponse.data) {
      console.log("Successfully added event");
      props.addEventCallback(addEventResponse.data);
      setOpen(false);
    } else {
      console.log(addEventResponse.error);
      console.log("Unable to add event");
    }
  };

  const setData = async () => {
    let userDataResponse = await getAllClients();
    console.log(userDataResponse);
    if (userDataResponse.data) {
      console.log("Successfully fetched user data");
      let options = [];
      userDataResponse.data.forEach(person => {
        options.push({
          key: person._id,
          text: person.firstName + " " + person.secondName,
          value: person._id,
          image: {
            avatar: true,
            src: "https://react.semantic-ui.com/images/avatar/large/matthew.png"
          }
        });
      });
      setUserData(options);
    } else {
      console.log(userDataResponse.error);
      console.log("Unable to fetch user data");
    }
  };

  return (
    <Modal
      open={open}
      trigger={
        <Button className="monthlyViewButton" onClick={() => setOpen(true)} primary>
          Add Appointment
        </Button>
      }
    >
      <Modal.Header>Add an appointment</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form>
            <Header as="h5">Appointment Type</Header>
            <Form.Field
              id="form-input-control-first-name"
              control={Input}
              placeholder="Appointment Type"
              onChange={type => setType(type.target.value)}
            />
            <Header as="h5">Appointment Title</Header>
            <Form.Field
              id="form-input-control-first-name"
              control={Input}
              placeholder="Appointment Title"
              onChange={title => setTitle(title.target.value)}
            />
            <Header as="h5">Customer</Header>
            <Dropdown
              placeholder="Select a Customer"
              fluid
              selection
              options={userData}
              onChange={(customer, data) => setPersonId(data.value)}
            />
            <Header as="h5">Date</Header>
            <DatePicker
              onChange={date => setStartDate(date)}
              selected={startDate}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              placeholderText="MM/DD/YYYY"
            />
            <Header as="h5">Duration</Header>
            <Dropdown
              placeholder="Appointment duration in minutes"
              fluid
              selection
              options={durationOptions}
              onChange={(duration, data) => setDuration(data.value)}
            />
            <Header as="h5">Notes</Header>
            <Form.TextArea
              onChange={notes => setNotes(notes.target.value)}
              placeholder="Extra information about the appointment"
            />
            <Button onClick={() => submitEvent()} primary>
              Add
            </Button>
            <Button color={"green"} onClick={() => setOpen(false)} primary>
              Close
            </Button>
          </Form>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};
export default AddEvent;
