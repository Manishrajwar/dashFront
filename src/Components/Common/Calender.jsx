import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "./common.css"

const events = [
  { date: new Date(2024, 7, 10), title: 'Meeting with Bob' },
  { date: new Date(2024, 7, 15), title: 'Project deadline' },
  { date: new Date(2024, 7, 20), title: 'Team lunch' },
];

function Calender() {
  const [value, onChange] = useState(new Date());

  const getTileContent = ({ date, view }) => {

    const event = events.find(
      (event) =>
        event.date.getFullYear() === date.getFullYear() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getDate() === date.getDate()
    );
    // Display event title if there's an event on this date
    return view === 'month' && event ? <p>{event.title}</p> : null;
  };

  return (
    <div className="calendarwrap">
      <Calendar
        onChange={onChange}
        value={value}
        tileContent={getTileContent}
      />
    </div>
  );
}

export default Calender;
