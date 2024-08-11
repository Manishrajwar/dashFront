import { useContext, useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "./common.css"
import { AppContext } from '../../Context/AppContext';


function formatEvents(data) {
  return data.map(item => {
    return {
      date: new Date(item.year, item.month - 1, item.date),
      title: item.title , 
      meetLink: item?.meetLink
    };
  });
}


function Calender() {
  const {fetchClockInDetails , calendervalue, onChange , calenderEvents  , setSelectedEvent} = useContext(AppContext);

  const [events , setEvent] = useState([]);

  const getTileContent = ({ date, view }) => {

    const event = events.find(
      (event) =>
        event.date.getFullYear() === date.getFullYear() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getDate() === date.getDate()
    );
    return view === 'month' && event ? <p>{event.title}</p> : null;
  };

  const handleClickDay = (date) => {
    const event = events.find(
      (event) =>
        event.date.getFullYear() === date.getFullYear() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getDate() === date.getDate()
    );
    setSelectedEvent(event || null);
  };

  
  useEffect(()=>{
    if(calendervalue){
      fetchClockInDetails(calendervalue);
     }
 // eslint-disable-next-line react-hooks/exhaustive-deps
  },[calendervalue]);

  useEffect(()=>{

    if(calenderEvents?.length > 0){
       const ans =  formatEvents(calenderEvents);
       setEvent(ans);
    }
 // eslint-disable-next-line react-hooks/exhaustive-deps
  },[calenderEvents])


  return (
    <div className="calendarwrap">
      <Calendar
        onChange={onChange}
        value={calendervalue}
        tileContent={getTileContent}
        onClickDay={handleClickDay}
      />
    </div>
  );
}

export default Calender;
