/* eslint-disable react/prop-types */
import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';

const initialDate = '2023-09-29';
const events = [
  {
    title: 'Evento 1',
    start: '2023-09-30T17:00:00',
    end: '2023-09-30T18:00:00'
  }
];

const Calendar = ({ initialView, eventContent }) => (
  <FullCalendar
    plugins={[dayGridPlugin, timeGridPlugin, timelinePlugin]}
    initialView={initialView}
    initialDate={initialDate}
    scrollTime={0}
    events={events}
    eventContent={eventContent}
  />
);

export default Calendar;
