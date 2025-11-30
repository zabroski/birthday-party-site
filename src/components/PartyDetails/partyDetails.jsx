
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
      <p>
        <strong>Theme:</strong> DJ Night 🚀
      </p>
      <p>
        <strong>Dress Code:</strong> Black &amp; White 🖤🤍
      </p>
      <p>
        <strong>Vibes:</strong> Snacks, food, drinks, music, and surprises —
        all provided by Abdoul’s brother, Omar cheick Zongo! 🎵🎉
      </p>
    </motion.div>
  </motion.section>
);

export default PartyDetails;



