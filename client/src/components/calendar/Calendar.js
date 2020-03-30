import React, { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Card, Button } from "semantic-ui-react";

import "./Calendar.css";

const Calendar = props => {
  const [isMonthlyViewEnabled, setIsMonthlyViewEnabled] = useState(true);
  const cal = useRef();

  useEffect(() => {
    cal.current
      .getApi()
      .changeView(isMonthlyViewEnabled ? "dayGridMonth" : "timeGridWeek");
  }, [isMonthlyViewEnabled]);

  return (
    <Card fluid>
      <Card.Content>
        <FullCalendar
          ref={cal}
          defaultView={isMonthlyViewEnabled ? "dayGridMonth" : "timeGridWeek"}
          plugins={[dayGridPlugin, timeGridPlugin]}
          events={props.events}
        />
      </Card.Content>
      <Card.Content extra>
        <Button primary>Add Appointment</Button>
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
