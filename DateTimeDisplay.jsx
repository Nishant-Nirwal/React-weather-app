import React, { useState, useEffect } from 'react';
function DateTimeDisplay() {
 const [dateTime, setDateTime] = useState(new Date());
 useEffect(() => {
   const timer = setInterval(() => {
     setDateTime(new Date());
   }, 1000); // updates every second
   return () => clearInterval(timer); // cleanup on unmount
 }, []);
 return (
  <div className="card2">
   <div style={{ textAlign: 'center', fontFamily: 'Arial' }}>
     {/* <h1>Current Date & Time</h1> */}
     <h2>{dateTime.toLocaleDateString('en-GB', {
       day: 'numeric',
       month: 'short',
       year: 'numeric'
     })}</h2>
     <h2>{dateTime.toLocaleTimeString('en-US', {
       hour: 'numeric',
       minute: 'numeric',
       second: 'numeric',
       hour12: true
     })}</h2>
   </div>
   </div>
 );
}
export default DateTimeDisplay;