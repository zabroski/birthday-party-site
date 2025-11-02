import React from "react";
import Countdown from "react-countdown";

const CountdownTimer = () => {
  // Replace with your actual event date and time
  const eventDate = new Date("2025-12-07T15:00:00");

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span className="countdown-finished">🎉 The party has started!</span>;
    } else {
      return (
        <div className="countdown">
          <h3>Countdown to the Party 🎈</h3>
          <div className="time-box">
            <span>{days}d</span> : <span>{hours}h</span> : <span>{minutes}m</span> : <span>{seconds}s</span>
          </div>
        </div>
      );
    }
  };

  return <Countdown date={eventDate} renderer={renderer} />;
};

export default CountdownTimer;



// import React from "react";
// import Countdown from "react-countdown";
// import { motion } from "framer-motion";
// import "./countdownTimer.css";

// const CountdownTimer = () => {
//   const eventDate = new Date("2025-12-07T15:00:00");

//   const renderer = ({ days, hours, minutes, seconds, completed }) => {
//     if (completed) {
//       return (
//         <motion.div
//           className="countdown-finished"
//           initial={{ opacity: 0, scale: 0.8 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.6 }}
//         >
//           🎉 The party has started — let’s dance! 🪩
//         </motion.div>
//       );
//     }
//     return (
//       <motion.div
//         className="countdown"
//         initial={{ opacity: 0, y: 60 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//       >
//         <h3>Countdown to the Party 🎈</h3>
//         <div className="time-box">
//           <span>{days}d</span>
//           <span>{hours}h</span>
//           <span>{minutes}m</span>
//           <span>{seconds}s</span>
//         </div>
//       </motion.div>
//     );
//   };

//   return <Countdown date={eventDate} renderer={renderer} />;
// };

// export default CountdownTimer;


