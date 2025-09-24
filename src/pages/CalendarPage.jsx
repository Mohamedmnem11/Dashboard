import React from 'react';
import CalendarView from '../components/CalendarView';

const CalendarPage = ({ drivers, routes }) => {
  return (
    <div className="p-0 md:p-6 ">
      <h1 className="text-3xl font-bold mb-6">Schedule Calendar</h1>
      <CalendarView drivers={drivers} routes={routes} />
    </div>
  );
};

export default CalendarPage;