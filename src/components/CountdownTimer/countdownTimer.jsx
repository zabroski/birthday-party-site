// import React from "react";
// import Countdown from "react-countdown";

// const CountdownTimer = () => {
//   // Replace with your actual event date and time
//   const eventDate = new Date("2025-12-07T15:00:00");

//   const renderer = ({ days, hours, minutes, seconds, completed }) => {
//     if (completed) {
//       return <span className="countdown-finished">🎉 The party has started!</span>;
//     } else {
//       return (
//         <div className="countdown">
//           <h3>Countdown to the Party 🎈</h3>
//           <div className="time-box">
//             <span>{days}d</span> : <span>{hours}h</span> : <span>{minutes}m</span> : <span>{seconds}s</span>
//           </div>
//         </div>
//       );
//     }
//   };

//   return <Countdown date={eventDate} renderer={renderer} />;
// };

// export default CountdownTimer;



import React from "react";
import Countdown from "react-countdown";

const CountdownTimer = () => {
  // ✅ Always use this date format — universal & mobile-safe
  const eventDate = new Date("November 30, 2025 15:00:00");

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return (
        <div className="countdown-finished">
          🎉 The party has started! 🎈
        </div>
      );
    }

    return (
      <div className="countdown">
        <h3>Countdown to the Party 🎈</h3>
        <div className="time-box">
          <span>{days}d</span>
          <span>{hours}h</span>
          <span>{minutes}m</span>
          <span>{seconds}s</span>
        </div>
      </div>
    );
  };

  return <Countdown date={eventDate} renderer={renderer} />;
};

export default CountdownTimer;




