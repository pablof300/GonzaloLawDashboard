import React, { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import AddEvent from "./AddEvent";
import { Card, Button, Popup, Modal, Header, Icon } from "semantic-ui-react";
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
  const [eventAdmin, setEventAdmin] = useState("n/a");
  const [eventClient, setEventClient] = useState("n/a");

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
    console.log(info);
    
    setEventData(info);
    setShowEventModal(true);
    console.log(info.event._instance.range.start);
    setStartDate(info.event._instance.range.start.toString());
    setEndDate(info.event._instance.range.end.toString());
    setTitle(info.event._def.title.toString());
    console.log(info.event._instance.range.start.toISOString());
    
    for (var i = 0; i < events.length; i++) {
      let poop = events[i].startDate;
      console.log(poop);
      if (events[i].startDate === info.event._instance.range.start.toISOString()) {
          console.log("went inside if statement");
          const temp = await getAdminById(events[i].admins[0]);
          setEventAdmin(temp.data.username.toString());
          const user = await getUserById(events[i].users[0]);
          setEventClient(user.data);
          
          break;
      }
    }
    console.log("made it here");
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
        <Modal.Content>
        <p>{JSON.stringify(eventAdmin)} </p> 
          <p>On: {JSON.stringify(startDate)} </p> 
          <p>Scheduled: {JSON.stringify(title)} </p>
          <p>Until: {JSON.stringify(endDate)}</p>
          <p>[Client] </p> 
        </Modal.Content>
      </Modal>
    </Card>
  );
};


export default Calendar;
