
// import React, { useState } from "react";
// import { collection, addDoc, Timestamp } from "firebase/firestore";
// import { db } from "../../components/FirebaseConfig/firebaseConfig";
// import Confetti from "react-confetti";
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
//     } catch (error) {
//       alert("Error submitting RSVP");
//     }
//     setLoading(false);
//   };

//   return (
//     <section id="rsvp" className="rsvp-section">
//       {submitted && <Confetti />}
//       <h2 className="rsvp-title">Reserve Your Spot 🎁</h2>

//       {submitted ? (
//         <p className="thank-you">
//           Thank you, {form.name}! We can’t wait to celebrate with you 🎉
//         </p>
//       ) : (
//         <form className="rsvp-form" onSubmit={handleSubmit}>
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

//           <button type="submit" className="submit-btn" disabled={loading}>
//             {loading ? "Sending..." : "Submit RSVP"}
//           </button>
//         </form>
//       )}
//     </section>
//   );
// };

// export default RSVPForm;




import React, { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../../components/FirebaseConfig/firebaseConfig";
import Confetti from "react-confetti";
import { motion } from "framer-motion";
import "./RSVPForm.css";

const RSVPForm = () => {
  const [form, setForm] = useState({ name: "", guests: 1, message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "rsvps"), {
        ...form,
        guests: Number(form.guests),
        createdAt: Timestamp.now(),
      });
      setSubmitted(true);
    } catch {
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
      <motion.h2
        className="rsvp-title"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Reserve Your Spot 🎁
      </motion.h2>

      {submitted ? (
        <motion.p
          className="thank-you"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
        >
          Thank you, {form.name}! We can’t wait to celebrate with you 🎉
        </motion.p>
      ) : (
        <motion.form
          className="rsvp-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
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
            transition={{ type: "spring", stiffness: 200 }}
          >
            {loading ? "Sending..." : "Submit RSVP"}
          </motion.button>
        </motion.form>
      )}
    </motion.section>
  );
};

export default RSVPForm;






