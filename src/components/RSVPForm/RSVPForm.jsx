
// import React, { useState } from "react";
// import { collection, addDoc, Timestamp } from "firebase/firestore";
// import { db } from "../../components/FirebaseConfig/firebaseConfig";
// import Confetti from "react-confetti";
// import { motion } from "framer-motion";
// import "./RSVPForm.css";

// const RSVPForm = () => {
//   const [form, setForm] = useState({ name: "", guests: 1, message: "" });
//   const [submitted, setSubmitted] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await addDoc(collection(db, "rsvps"), {
//         ...form,
//         guests: Number(form.guests),
//         createdAt: Timestamp.now(),
//       });
//       setSubmitted(true);
//     } catch {
//       alert("Error submitting RSVP");
//     }
//     setLoading(false);
//   };

//   return (
//     <motion.section
//       id="rsvp"
//       className="rsvp-section"
//       initial={{ opacity: 0, y: 60 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.8 }}
//       viewport={{ once: true }}
//     >
//       {submitted && <Confetti />}
//       <motion.h2
//         className="rsvp-title"
//         initial={{ opacity: 0, y: -20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.2 }}
//       >
//         Reserve Your Spot 🎁
//       </motion.h2>

//       {submitted ? (
//         <motion.p
//           className="thank-you"
//           initial={{ opacity: 0, scale: 0.9 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//         >
//           Thank you, {form.name}! We can’t wait to celebrate with you 🎉
//         </motion.p>
//       ) : (
//         <motion.form
//           className="rsvp-form"
//           onSubmit={handleSubmit}
//           initial={{ opacity: 0, scale: 0.95 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           transition={{ delay: 0.3 }}
//         >
//           <div className="input-group">
//             <input
//               type="text"
//               name="name"
//               value={form.name}
//               onChange={handleChange}
//               required
//               placeholder=" "
//             />
//             <label>Your Name</label>
//           </div>

//           <div className="input-group">
//             <input
//               type="number"
//               name="guests"
//               min="1"
//               value={form.guests}
//               onChange={handleChange}
//               required
//               placeholder=" "
//             />
//             <label>Number of Guests</label>
//           </div>

//           <div className="input-group">
//             <textarea
//               name="message"
//               value={form.message}
//               onChange={handleChange}
//               rows="3"
//               placeholder=" "
//             />
//             <label>Message (optional)</label>
//           </div>

//           <motion.button
//             type="submit"
//             className="submit-btn"
//             disabled={loading}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.97 }}
//             transition={{ type: "spring", stiffness: 200 }}
//           >
//             {loading ? "Sending..." : "Submit RSVP"}
//           </motion.button>
//         </motion.form>
//       )}
//     </motion.section>
//   );
// };

// export default RSVPForm;




import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs, Timestamp } from "firebase/firestore";
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

  // Fetch total guests on mount
  useEffect(() => {
    const fetchGuestCount = async () => {
      try {
        const snapshot = await getDocs(collection(db, "rsvps"));
        let total = 0;
        snapshot.forEach((doc) => {
          const data = doc.data();
          total += Number(data.guests) || 0;
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
    if (isFull) return; // just in case

    setLoading(true);
    try {
      // Fetch latest total before submitting
      const snapshot = await getDocs(collection(db, "rsvps"));
      let total = 0;
      snapshot.forEach((doc) => {
        const data = doc.data();
        total += Number(data.guests) || 0;
      });

      if (total + Number(form.guests) > MAX_GUESTS) {
        setIsFull(true);
        setLoading(false);
        return;
      }

      await addDoc(collection(db, "rsvps"), {
        ...form,
        guests: Number(form.guests),
        createdAt: Timestamp.now(),
      });
      setSubmitted(true);
    } catch (error) {
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





