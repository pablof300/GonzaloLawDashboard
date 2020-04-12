import React, { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import AddEvent from "./AddEvent";
import { Card, Button, Modal, Form } from "semantic-ui-react";
import interactionPlugin from '@fullcalendar/interaction';
import {getAdminById} from '../../api/AdminApi'
import {getUserById} from '../../api/UserApi'  


import "./Calendar.css";

const Calendar = props => {
  const [isMonthlyViewEnabled, setIsMonthlyViewEnabled] = useState(true);
  const [events, setEvents] = useState([]);
  const cal = useRef();
  let  [,setState]=useState();
  const [eventData, setEventData] = useState([]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [startDate, setStartDate] = useState("n/a");
  const [endDate, setEndDate] = useState("n/a");
  const [title, setTitle] = useState("n/a");
  const [eventAdmin, setEventAdmin] = useState("");
  const [eventClient, setEventClient] = useState("");

  useEffect(() => {
    setEvents(props.events);
  }, [props.events]);

  useEffect(() => {
    cal.current
      .getApi()
      .changeView(isMonthlyViewEnabled ? "dayGridMonth" : "timeGridWeek");
  }, [isMonthlyViewEnabled]);

  

  const addEventCallback = event => {
    let currentEvents = events;
    events.push(event);
    setEvents(currentEvents);
    setState({});
    setEventData(currentEvents[0]);
  };

  const getFormattedEvents = (events) => {
    let formattedEvents = [];
    events.forEach(event => {
      formattedEvents.push({
        title: event.title,
        start: event.startDate,
        end: event.endDate
      });
    });
    return formattedEvents;
  }
  //get the admin and user information so message can say [lawyer] has a meeting at [time] doing [x] until [y] with [client]
  const eventsModal = async (info) => {
    
    setEventData(info);
    setShowEventModal(true);
    let date1 = new Date(info.event._instance.range.start);
    let startMin = date1.getUTCMinutes();

    if (startMin < 10) {
      startMin = '0' + startMin;
    }

    startMin = ':' + startMin + " (EDT)";
    let start = JSON.stringify(info.event._instance.range.start);
    start = start.replace(/\"/g, "");
    start = start.substr(0,10);
    start =  start + date1.getUTCHours() + startMin;
    setStartDate(start);

    let date2 = new Date(info.event._instance.range.end);
    let endMin = date2.getUTCMinutes();
    if (endMin < 10) {
      endMin = '0' + endMin;
    }

    endMin = ':' + endMin + " (EDT)";
    let end = JSON.stringify(info.event._instance.range.end);
    end = end.replace(/\"/g, "");
    end = end.substr(0,10);
    end = end + date2.getUTCHours() + endMin;
    setEndDate(end);
    let title = JSON.stringify(info.event._def.title);
    title = info.event._def.title.replace(/\"/g, "");
    setTitle(title);
    
    for (var i = 0; i < events.length; i++) {
      if (events[i].startDate === info.event._instance.range.start.toISOString()) {
          const temp = await getAdminById(events[i].admins[0]);
          let adminName = JSON.stringify(temp.data.firstName + " " + temp.data.secondName);
          adminName = adminName.replace(/\"/g, "");
          setEventAdmin(adminName);
          const user = await getUserById(events[i].users[0]);
          let userName = JSON.stringify(user.data.firstName + " " + user.data.secondName);
          userName = userName.replace(/\"/g, "");
          setEventClient(userName);         
          break;
      }
    }
    
  }

  const closeEventModal = () => {
    setShowEventModal(false);
  } 



  return (
    <Card fluid>
      <Card.Content>
        <FullCalendar
          timeZone = 'UTC'
          ref={cal}
          defaultView={isMonthlyViewEnabled ? "dayGridMonth" : "timeGridWeek"}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          events={getFormattedEvents(events)}
          eventClick= {eventsModal}
        />
      </Card.Content>
      <Card.Content extra>
        {props.adminView &&
          <AddEvent addEventCallback={addEventCallback} />
        }
        <Button
          color={"green"}
          onClick={() => setIsMonthlyViewEnabled(!isMonthlyViewEnabled)}
        >
          Switch to {isMonthlyViewEnabled ? "weekly" : "monthly"} view
        </Button>
      </Card.Content>
      <Modal open = {showEventModal}
      onClose = {closeEventModal}
      closeIcon
      centered
      >
      <Modal.Header>{title} </Modal.Header>  
        <Modal.Content>
          <Form>
          <Form.Input label="Staff"
                      placeholder="Lawyer"
                      labelPosition="left"
                      readOnly
                      value={!eventAdmin ? "" : eventAdmin}
          />
          <Form.Input label="On"
                      placeholder="n/a"
                      labelPosition="left"
                      readOnly
                      value={!startDate ? "" : startDate.substr(0, 10) + " at " + startDate.substr(10, 17)}
          />
          <Form.Input label="Until"
                      placeholder="n/a"
                      labelPosition="left"
                      readOnly
                      value={!endDate ? "" : endDate.substr(0, 10) + " at " + endDate.substr(10, 17)}
          />
          <Form.Input label="Client"
                      placeholder="n/a"
                      labelPosition="left"
                      readOnly
                      value={!eventClient ? "" : eventClient}
          />
          
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button grey
          onClick={closeEventModal}
          >
            Ok
          </Button>
        </Modal.Actions>
      </Modal>
    </Card>
  );
};


export default Calendar;
