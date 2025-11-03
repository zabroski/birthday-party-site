import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../components/FirebaseConfig/firebaseConfig";
import Confetti from "react-confetti";
import { motion } from "framer-motion";
import "./RSVPForm.css";

const MAX_GUESTS = 40;

const RSVPForm = () => {
  const [form, setForm] = useState({ name: "", guests: 1, message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalGuests, setTotalGuests] = useState(0);
  const [isFull, setIsFull] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState(false);

  // Fetch total guests on mount or when someone submits
  useEffect(() => {
    const fetchGuestCount = async () => {
      try {
        const snapshot = await getDocs(collection(db, "rsvps"));
        let total = 0;
        snapshot.forEach((doc) => {
          total += Number(doc.data().guests) || 0;
        });
        setTotalGuests(total);
        if (total >= MAX_GUESTS) setIsFull(true);
      } catch (err) {
        console.error("Error counting guests:", err);
      }
    };
    fetchGuestCount();
  }, [submitted]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFull) return;

    setLoading(true);
    try {
      // 🔍 1. Check for duplicate name
      const nameQuery = query(
        collection(db, "rsvps"),
        where("name", "==", form.name.trim())
      );
      const nameSnapshot = await getDocs(nameQuery);

      if (!nameSnapshot.empty) {
        // Name already exists
        setIsDuplicate(true);
        setLoading(false);
        return;
      }

      // 🔢 2. Check total guest count before adding
      const allDocs = await getDocs(collection(db, "rsvps"));
      let total = 0;
      allDocs.forEach((doc) => {
        total += Number(doc.data().guests) || 0;
      });
      if (total + Number(form.guests) > MAX_GUESTS) {
        setIsFull(true);
        setLoading(false);
        return;
      }

      // ✅ 3. Add new RSVP
      await addDoc(collection(db, "rsvps"), {
        name: form.name.trim(),
        guests: Number(form.guests),
        message: form.message,
        createdAt: Timestamp.now(),
      });

      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting RSVP:", error);
      alert("Error submitting RSVP");
    }
    setLoading(false);
  };

  return (
    <motion.section
      id="rsvp"
      className="rsvp-section"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {submitted && <Confetti />}
      <h2 className="rsvp-title">Reserve Your Spot 🎁</h2>

      {isFull ? (
        <p className="thank-you">
          Sorry! The guest list is full ({MAX_GUESTS} spots taken). 🎈  
          We can’t wait to see everyone at Abdoul’s party!
        </p>
      ) : isDuplicate ? (
        <p className="thank-you">
          You already signed up for Abdoul’s party 🎈  
          Can’t wait to see you there!
        </p>
      ) : submitted ? (
        <p className="thank-you">
          Thank you, {form.name}! We can’t wait to celebrate with you 🎉
        </p>
      ) : (
        <>
          <p className="remaining">
            {MAX_GUESTS - totalGuests} spots left 🎟️
          </p>

          <form className="rsvp-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder=" "
              />
              <label>Your Name</label>
            </div>

            <div className="input-group">
              <input
                type="number"
                name="guests"
                min="1"
                value={form.guests}
                onChange={handleChange}
                required
                placeholder=" "
              />
              <label>Number of Guests</label>
            </div>

            <div className="input-group">
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="3"
                placeholder=" "
              />
              <label>Message (optional)</label>
            </div>

            <motion.button
              type="submit"
              className="submit-btn"
              disabled={loading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              {loading ? "Sending..." : "Submit RSVP"}
            </motion.button>
          </form>
        </>
      )}
    </motion.section>
  );
};

export default RSVPForm;






