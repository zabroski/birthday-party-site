// src/components/LimitedPartyNotice/LimitedPartyNotice.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./LimitedPartyNotice.css";

const LimitedPartyNotice = () => {
  const [isOpen, setIsOpen] = useState(true); // show on load

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="notice-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="notice-modal"
            initial={{ scale: 0.8, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: 40, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="notice-title">Important Party Reminder 🎈</h2>
            <p className="notice-text">
              This is a <strong>limited-capacity birthday party</strong>.  
            </p>
            <ul className="notice-list">
              <li>✅ Only the guests who receive this invitation are invited.</li>
              <li>🚫 Please <strong>do not invite extra friends or guests</strong>.</li>
              <li>
                📣 If you need to add someone, please contact Tiffany or Pita first.
              </li>
            </ul>
            <p className="notice-info">Please RSVP as soon as possible so we can provide an accurate headcount to the restaurant🍽️</p>
            <p className="notice-highlight">Thank you for helping us keep Abdoul’s celebration special.</p>
            <button
              className="notice-button"
              onClick={() => setIsOpen(false)}
            >
              I Understand 👍
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LimitedPartyNotice;
