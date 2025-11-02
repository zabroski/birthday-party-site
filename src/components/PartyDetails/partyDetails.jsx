
// import React from "react";
// import "./partyDetails.css";

// const PartyDetails = () => (
//   <section className="party-details">
//     <h2>🎧 Party Details</h2>
//     <div className="details-card">
//       <p><strong>Theme:</strong> DJ 🚀</p>
//       <p><strong>Dress Code:</strong> All Black & Fun 🖤</p>
//       <p><strong>Vibes:</strong> Snacks, Food, Drinks, Music, and Surprises for everyone!</p>
//     </div>
//   </section>
// );

// export default PartyDetails;



import React from "react";
import { motion } from "framer-motion";
import "./partyDetails.css";

const PartyDetails = () => (
  <motion.section
    className="party-details"
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
  >
    <h2>🎧 Party Details</h2>
    <motion.div
      className="details-card"
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      <p><strong>Theme:</strong> DJ 🚀</p>
      <p><strong>Dress Code:</strong> All Black & Fun 🖤</p>
      <p><strong>Vibes:</strong> Snacks, Food, Drinks, Music, and Surprises!</p>
    </motion.div>
  </motion.section>
);

export default PartyDetails;


