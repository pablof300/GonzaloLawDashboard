import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
//import './main.scss'

const FCalendar = () => {
  return (
    <FullCalendar defaultView="dayGridMonth" plugins={[ dayGridPlugin ]}/>
  )
};

export default FCalendar
