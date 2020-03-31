import React, { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import AddEvent from "./AddEvent";
import { Card, Button } from "semantic-ui-react";

import "./Calendar.css";

const Calendar = props => {
  const [isMonthlyViewEnabled, setIsMonthlyViewEnabled] = useState(true);
  const [events, setEvents] = useState([]);
  const cal = useRef();
  let  [,setState]=useState();

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

  return (
    <Card fluid>
      <Card.Content>
        <FullCalendar
          ref={cal}
          defaultView={isMonthlyViewEnabled ? "dayGridMonth" : "timeGridWeek"}
          plugins={[dayGridPlugin, timeGridPlugin]}
          events={getFormattedEvents(events)}
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
    </Card>
  );
};
export default Calendar;
